### TODO: A utility class which will be created by the user , with Class name as " _[your roll number]" ,
# TODO: all transformations should be written inside a function which will be called inside the predict method
import pandas as pd
import datetime
from datetime import timedelta
from sklearn.preprocessing import MinMaxScaler
import numpy

class _1806259():

    ## TODO: Please note that document id should be present till the getPredictions method
    def __tranformation1(self,data, scaler):

        # your transformation logic goes here
        data['dueDate'] =  pd.to_datetime(data['dueDate'], format='%d-%b-%Y')
        data['docCreateDate'] = pd.to_datetime(data['docCreateDate'], format='%d-%b-%Y')
        data['buffer_days'] = (data['dueDate']-data['docCreateDate']).dt.days
        data['total_open_amount'] = data['invoiceAmount']

        data = data[['total_open_amount', 'buffer_days']]
        scaler.transform(data)
        return data

    def __transformation2(self,data):

        # your transformation logic goes here
        row_indexes = data[data['predictions']<=15].index
        data.loc[row_indexes,'predAgingBucket']="0-15 Days"

        row_indexes = data[(data['predictions']>=16) & (data['predictions']<=30)].index
        data.loc[row_indexes,'predAgingBucket']="16-30 Days"

        row_indexes = data[(data['predictions']>=31) & (data['predictions']<=45)].index
        data.loc[row_indexes,'predAgingBucket']="31-45 Days"

        row_indexes = data[(data['predictions']>=46) & (data['predictions']<=60)].index
        data.loc[row_indexes,'predAgingBucket']="46-60 Days"
        
        row_indexes = data[data['predictions']>=61].index
        data.loc[row_indexes,'predAgingBucket']="greater than 60 days"

        for i in range(0, data.shape[0]):
            print(numpy.round(data.loc[i, 'predictions']))
            data.loc[i, 'predictedDate'] = data.loc[i, 'dueDate'] + timedelta(days=numpy.round(data.loc[i, 'predictions']))

            if data.loc[i, 'predictedDate'] < data.loc[i, 'docCreateDate']:
                data.loc[i, 'predictedDate'] = data.loc[i, 'docCreateDate']
        
        data['predictedDate'] = data['predictedDate'].dt.strftime('%d-%b-%Y')
        return data

    def getPredictions(self,data,model, scaler):
        test_data = self.__tranformation1(data, scaler)
    
        print(test_data)
        # data should be a dataFrame and not a numpy array
        predictions = model.predict(test_data)

        p = pd.DataFrame(predictions,columns=['predictions'])
        data = pd.DataFrame(data)
        data = pd.concat([data, p], axis=1)
        data = self.__transformation2(data)
        pred = data.loc[:,['docID','predictedDate', 'predAgingBucket']].to_dict(orient="records")
        return pred
