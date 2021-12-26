from datetime import datetime
import requests
import pandas as pd
import json
import talib as tal


def log(message):
    print(datetime.now().strftime('%I:%M:%S')+" : "+message)


print("===================================================")
start_time = datetime.now()
log("START")
print("===================================================")

# total_orders_found = 0
kite_token = "enctoken Efw1PC6bCTyGYVwT0kEJHDWE4np6p963enayEwzeCUr1EfK5E8TkdGO1KcmlcAFPM2oK1OX2VSI/15Lr9n+UvpBShgIyUvZxb26f+1tF5ucChBQ/tnWRYw=="


def data_collection():
    total_data_points = 0
    log("PROCESSING INSTRUMENTS SYMBOLS")
    print("-----------------------------------------------")
    df_symbols = pd.read_csv('controls/instruments.csv')
    from_date = datetime.now().strftime('%Y-%m-%d')
    to_date = datetime.now().strftime('%Y-%m-%d')

    for index, row in df_symbols.iterrows():
        endpoint = "https://kite.zerodha.com/oms/instruments/historical/"
        code = str(row["KEY"])
        interval = "/5minute"
        headers = {'content-type': 'application/json',
                   "authorization": kite_token}
        url = endpoint + code + interval
        params = (
            ('user_id', 'VM7727'),
            ('oi', '1'),
            ('from', str(from_date)),
            ('to', str(to_date)),
            # ('from', '2021-09-20'),
            # ('to', '2021-09-20'),
        )
        response = requests.get(
            url, timeout=600, headers=headers, params=params).json()
        df = pd.DataFrame(response['data']['candles'], columns=[
                          'candle', 'open', 'high', 'low', 'close', 'volume', 'oi'])

        # tech analysis ends
# https://www.youtube.com/watch?v=ixLIlk5G13M
        # df["BB"] = tal.BBANDS(df)
        df["ADX"] = tal.ADX(high=df["high"], low=df["low"], close=df["close"])
        df["ATR"] = tal.ATR(high=df["high"], low=df["low"], close=df["close"])
        df["AROONOSC"] = tal.AROONOSC(high=df["high"], low=df["low"])
        df["EMA_21"] = tal.EMA(df["close"], timeperiod=21)
        df["EMA_14"] = tal.EMA(df["close"], timeperiod=14)
        df["RSI"] = tal.RSI(df['close'])
        # tech analysis ends

        # print(df["BB"])
        # path = "data/"
        # filename = str(row["SYMBOL"])
        # extension = ".csv"
        # save_file = path + filename + extension
        # df.to_csv(save_file)

        total_data_points = total_data_points + df[df.columns[0]].count()
        # log(" => "+str(df[df.columns[0]].count()) + " DATA POINTS : "+row["SYMBOL"])
        signal_generation(row["SYMBOL"], df)
    # print("Data symbols   : "+str(df_symbols.shape[0]))
    # print("Data collected : "+str(total_data_points))
    return


def signal_generation(symbol, signal_data):
    log("SCANNING : "+symbol)
    order = {}
    orderType = ""
    for index, row in signal_data.iterrows():
        # if (row["ADX"] > 21) and (row["AROONOSC"] > 80 or row["AROONOSC"] < -80) and (row["RSI"] < 30 or row["RSI"] > 70):
        if ((row["RSI"] < 20 or row["RSI"] > 80)):

            orderType = "BUY"
            price = (row["open"] + row["high"] + row["low"] + row["close"])/4
            target = price + row["ATR"]
            stoploss = price - row["ATR"]
            if row["EMA_14"] > row["EMA_21"]:
                orderType = "SELL"
                target = price - row["ATR"]
                stoploss = price + row["ATR"]

            order = {
                'time': row["candle"],
                'type': orderType,
                'instrument': symbol,
                'product': 'MIS',
                'target': round(target, 1),
                'stoploss': round(stoploss, 1),
                'qty': 10,
                'price': round(price, 1),
            }
    # log("SIGNAL GENERATED")
    if orderType != "":
        # print(order)
        # order_generation(order)
        # total_orders_found = total_orders_found + 1
        log("ORDER FOUND "+str(order["time"])+" : "+order["type"]+" @ "+str(order["price"])+" / SL: "+str(order["stoploss"])+" / TAR : "+str(order["target"]))
    print("-----------------------------------------------")
    return


def order_generation(order_data):
    if order_validate(order_data):
        order = {
            "variety": "regular",
            "exchange": "NSE",
            "tradingsymbol": order_data["instrument"],
            "transaction_type": order_data["type"],
            "order_type": "LIMIT",
            "quantity": order_data["qty"],
            "price": order_data["price"],
            "product": "MIS",
            "validity": "DAY",
            "disclosed_quantity": 0,
            "trigger_price": order_data["stoploss"],
            "squareoff": 0,
            "stoploss": 0,
            "trailing_stoploss": 0,
            "user_id": "VM7727"
        }
        headers = {'content-type': 'application/x-www-form-urlencoded',
                   "authorization": kite_token}
        log("ORDER PROCCESED : "+order["price"])
        url = "https://kite.zerodha.com/oms/orders/regular"
        response = requests.post(
            url, timeout=600, headers=headers, data=order).json()
        if(response["status"] == "success"):
            sl_generation(order_data)
    return


def sl_generation(order_data):
    order = {
        "variety": "regular",
        "exchange": "NSE",
        "tradingsymbol": order_data["instrument"],
        "transaction_type": order_data["type"],
        "order_type": "SL-M",
        "quantity": order_data["qty"],
        "price": 0,
        "product": "MIS",
        "validity": "DAY",
        "disclosed_quantity": 0,
        "trigger_price":  order_data["stoploss"],
        "squareoff": 0,
        "stoploss": 0,
        "trailing_stoploss": 0,
        "user_id": "VM7727"
    }
    headers = {'content-type': 'application/x-www-form-urlencoded',
            "authorization": kite_token}
    log("SL PROCCESED : "+order["stoploss"])
    url = "https://kite.zerodha.com/oms/orders/regular"
    response = requests.post(
        url, timeout=600, headers=headers, data=order).json()
    if(response["status"] == "success"):
        target_generation(order_data)
    return


def target_generation(order_data):
    order = {
        "variety": "regular",
        "exchange": "NSE",
        "tradingsymbol": order_data["instrument"],
        "transaction_type": order_data["type"],
        "order_type": "LIMIT",
        "quantity": order_data["qty"],
        "price": order_data["target"],
        "product": "MIS",
        "validity": "DAY",
        "disclosed_quantity": 0,
        "trigger_price": 0,
        "squareoff": 0,
        "stoploss": 0,
        "trailing_stoploss": 0,
        "user_id": "VM7727"
    }
    headers = {'content-type': 'application/x-www-form-urlencoded',
            "authorization": kite_token}
    log("TARGET PROCCESED : "+order["target"])
    url = "https://kite.zerodha.com/oms/orders/regular"
    response = requests.post(
        url, timeout=600, headers=headers, data=order).json()
    # if(response["status"] == "success"):
        # target_generation(order)
    return

def order_validate(order_data):
    order_time = (order_data["time"]).replace('+0530', '')
    d1 = datetime.strptime(order_time, '%Y-%m-%dT%H:%M:%S')
    d2 = datetime.now()
    diff = round((d2-d1).total_seconds() / 60.0)

    headers = {'content-type': 'application/json',
               "authorization": kite_token}
    url = "https://kite.zerodha.com/oms/orders"
    response = requests.get(url, timeout=600, headers=headers).json()
    check_order = "NO"
    if(diff < 2 and response["status"] == "success"):
        df_orders = pd.DataFrame(response["data"])
        for index, row in df_orders.iterrows():
            # row["status"] == "COMPLETE" 
            if((row["status"] == "REJECTED" or row["status"] == "CANCELLED AMO") and row["tradingsymbol"] == order_data["instrument"]):
                check_order = "YES"
        if(check_order == "NO"):
            return True
        else:
            return False
    else:
        return False
    # then check order list


# main start
data_collection()


print("===================================================")
log("END")
print("===================================================")
end_time = datetime.now()
time_taken = divmod((end_time-start_time).total_seconds(), 60)[0]
# print("Total orders   : "+str(total_orders_found))
print("Start Time     : "+str(start_time))
print("End Time       : "+str(end_time))
print("Time Taken     : "+str(time_taken))
print("===================================================")

# remaining (cancel order if not in position to clean position (SL/TAR))