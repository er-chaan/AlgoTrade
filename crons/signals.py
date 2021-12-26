import mysql.connector as connection
import pandas as pd
import pandas_ta as ta
try:
    mydb = connection.connect(host="localhost", database = 'AlgoTrade',user="root", passwd="qwerty@123",use_pure=True)
    query = "Select open,high,low,close from CANBK;"
    result_dataFrame = pd.read_sql(query,mydb)
    result_dataFrame.to_csv('CANBK.csv')
    mydb.close() #close the connection

    # start

    df = pd.read_csv("CANBK.csv", sep=",")
    # df.ta.log_return(cumulative=True, append=True)
    # df.ta.percent_return(cumulative=True, append=True)
    
    # print(df["open"])

    df['rsi'] = ta.rsi(df['close'], length = 14)
    df['supertrand'] = ta.supertrend(high=df['high'],low=df['low'],close=df['close'],length=None, multiplier=None, offset=None)
    # df.columns
    # df.tail()

    # end

    print(df)
except Exception as e:
    mydb.close()
    print(str(e))
