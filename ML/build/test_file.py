import final_build

model = final_build.GBR_Real_Estate_Model()
print(model.predict(["New Building", "Арбатская", 15, 3, 150, 40, 10, 22, "European-style renovation"]))

'''
Secondary, Румянцево, 18.0, 2.0, 40.00, 10.0, 6.0, 9, Cosmetic
'''
