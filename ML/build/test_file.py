import final_build

model = final_build.GBR_Real_Estate_Model()
print(model.predict(['Secondary', 'Румянцево', 18.0, 2.0, 40.00, 10.0, 6.0, 9, 'Cosmetic']))

'''
Secondary, Румянцево, 18.0, 2.0, 40.00, 10.0, 6.0, 9, Cosmetic
'''