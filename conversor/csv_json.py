import csv
import json

def csv_to_json(csv_file, json_file):
    data = []
    count = {}  # Contador para cada valor de "geo"
    current_geo = None  
    with open(csv_file, 'r') as csvfile:
        csvreader = csv.DictReader(csvfile, delimiter=';')
        for i, row in enumerate(csvreader):
            formatted_row = {}
            for key, value in row.items():
                # Intenta convertir el valor a un número
                try:
                    value = float(value)  # Intenta convertir a flotante
                    if value.is_integer():
                        value = int(value)  # Si es un entero, conviértelo a entero
                except ValueError:
                    pass  # Si no se puede convertir a número, dejar como está

                

                if key == "geo":
                    # Verificar si el valor de "geo" ha cambiado
                    if value != current_geo:
                        count[value] = 1  # Restablecer el contador
                        current_geo = value  # Actualizar el valor actual de "geo"
                    else:
                        count[value] += 1  # Incrementar el contador
                    formatted_row["id"] = f"Localizacion/{value}/{value}{count[value]}"
                    formatted_row["area"] = 1
                
                else:
                    if key== "OBS_VALUE":
                        value=float(value)/10
                    formatted_row[key] = value

            data.append(formatted_row)
    
    with open(json_file, 'w') as jsonfile:
        json.dump(data, jsonfile, indent=4)


csv_file_path = 'C:\\Users\\Nieves\\Desktop\\Universidad\\TFG2024\\conversor\\data\\data1.csv'
json_file_path = 'C:\\Users\\Nieves\\Desktop\\Universidad\\TFG2024\\conversor\\data\\data1.json'
csv_to_json(csv_file_path, json_file_path)
