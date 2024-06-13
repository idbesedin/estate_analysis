import pandas as pd
from catboost import CatBoostRegressor
import joblib
import json
import sys


class GBR_Real_Estate_Model():
    def __init__(self):
        '''

        '''
        self.columns = {0: 'Apartment type', 1: 'Metro station', 2: 'Minutes to metro', 3: 'Number of rooms',
                        4: 'Area', 5: 'Kitchen area', 6: 'Floor', 7: 'Number of floors', 8: 'Renovation'}

        self.model = CatBoostRegressor()
        self.model = self.model.load_model(fname='CBR_regressor.onnx', format='onnx')
        self.TE = joblib.load('Custom_Target_Encoder.joblib')
        self.scaler = joblib.load('Custom_Scaler.joblib')
        self.LE = joblib.load('Custom_Label_Encoder.joblib')

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
        prediction = self.model.predict(processed)
        return prediction

if __name__ == "__main__":
    input_list = json.loads(sys.argv[1])
    model = GBR_Real_Estate_Model()
    prediction = model.predict(input_list)
    print(json.dumps({"prediction": prediction.tolist()}))
