import pandas as pd
from catboost import CatBoostRegressor
import joblib
import numpy as np
import json
import sys


class GBR_Real_Estate_Model():
    def __init__(self, path):
        '''

        '''
        self.columns = {0: 'Apartment type', 1: 'Metro station', 2: 'Minutes to metro', 3: 'Number of rooms',
                        4: 'Area', 5: 'Kitchen area', 6: 'Floor', 7: 'Number of floors', 8: 'Renovation'}

        self.model = CatBoostRegressor()
        self.model = self.model.load_model(fname=path + '\\' + 'CBR_regressor.onnx', format='onnx')
        self.TE = joblib.load(path + '\\' +'Custom_Target_Encoder.joblib')
        self.scaler = joblib.load(path + '\\' +'Custom_Scaler.joblib')
        self.LE = joblib.load(path + '\\' +'Custom_Label_Encoder.joblib')

    def __PreprocessingPipeline(self, input_data) -> pd.DataFrame:
        '''
        Implementation of data preprocessing for the model to do inference
        :param input_data:
        :return: pd.DataFrame - ready data
        '''
        if isinstance(input_data, list):
            input_data = pd.DataFrame([input_data]).rename(self.columns, axis=1)
        else:
            raise ValueError

        input_data['Metro station'] = pd.DataFrame(self.TE.transform(pd.DataFrame(input_data['Metro station'])))
        input_data['Renovation'] = self.LE.transform(input_data['Renovation'])
        input_data['Apartment type'] = input_data['Apartment type'].map({'Secondary': 0, 'New building': 1})
        input_data = self.scaler.transform(input_data)
        return input_data

    def predict(self, input_data) -> float:
        '''

        :param input_data: pd.DataFrame of processed data
        :return:
        '''
        processed = self.__PreprocessingPipeline(input_data)
        prediction = np.round(self.model.predict(processed), 0)
        return prediction


if __name__ == "__main__":
    input_list = json.loads(sys.argv[1])
    # input_list = json.loads('["New Building","Медведково",15,3,150,40,10,22,"European-style renovation"]')
    path = 'C:\Work_life\HSE_and_study\Downloads\\tumbochkina\\estate_analysis\\ML\\build'
    model = GBR_Real_Estate_Model(path)
    prediction = model.predict(input_list)
    print(json.dumps({"prediction": prediction.tolist()}))
