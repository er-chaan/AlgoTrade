import datetime

date_time_str = '2021-09-20T09:15:00+0530'

date_time_str = date_time_str.replace('+0530','')

date_time_obj = datetime.datetime.strptime(date_time_str, '%Y-%m-%dT%H:%M:%S')

d2 = datetime.datetime.now() 

diff = round((d2-date_time_obj).total_seconds() / 60.0)

print(diff)

if(diff < 1):

    print("YESS")
# print ("The type of the date is now",  type(date_time_obj))
# print ("The date is", date_time_obj)