import csv
import json

def csv_to_json(csv_file, json_file):
    data = []
    count = {}  # Contador para cada valor de "geo"
    current_geo = None 

    diccionario_paises = {
    "AT": {"x": 9, "y": 9},
    "BE": {"x": 8, "y": 6},
    "BG": {"x": 11, "y": 12},
    "CH": {"x": 9, "y": 7},
    "CZ": {"x": 8, "y": 9},
    "DE": {"x": 7, "y": 8},
    "DK": {"x": 5, "y": 8},
    "EE": {"x": 4, "y": 12},
    "ES": {"x": 11, "y": 2},
    "FI": {"x": 2, "y": 11},
    "FR": {"x": 9, "y": 5},
    "HR": {"x": 10, "y": 10},
    "HU": {"x": 9, "y": 10},
    "IE": {"x": 6, "y": 3},
    "IT": {"x": 10, "y": 7},
    "LT": {"x": 6, "y": 12},
    "LV": {"x": 5, "y": 12},
    "NO": {"x": 3, "y": 8},
    "PL": {"x": 7, "y": 10},
    "PT": {"x": 11, "y": 1},
    "RO": {"x": 10, "y": 12},
    "SE": {"x": 1, "y": 10},
    # Puedes agregar más elementos según necesites
}

    with open(csv_file, 'r') as csvfile:
        csvreader = csv.DictReader(csvfile, delimiter=';')
        for i, row in enumerate(csvreader):
            formatted_row = {}
            for key, value in row.items():
                # Intenta convertir el valor a un número

                if key == "geo" and value  in diccionario_paises:
                    # Verificar si el valor de "geo" ha cambiado
                    if value != current_geo:
                        count[value] = 1  # Restablecer el contador
                        current_geo = value  # Actualizar el valor actual de "geo"
                    else:
                        count[value] += 1  # Incrementar el contador
                        formatted_row["id"] = value
                        formatted_row["x"] = diccionario_paises[value]["x"]
                        formatted_row["y"] = diccionario_paises[value]["y"]
                        formatted_row["area"] = 1


                if key == "TIME_PERIOD":
                    formatted_row[key] = value

                if key== "OBS_VALUE":
                    value=float(value)/10
                    formatted_row[key] = value

            if "id" in formatted_row :
                data.append(formatted_row)
    
    with open(json_file, 'w') as jsonfile:
        json.dump(data, jsonfile, indent=4)


csv_file_path = 'conversor\\data\\data1.csv' 
json_file_path = 'conversor\\data\\data1.json'
csv_to_json(csv_file_path, json_file_path)
