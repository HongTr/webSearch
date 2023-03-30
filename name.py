import csv
import json

csvfile = open('output.csv', 'r')
jsonfile = open('output.json', 'w')

fieldnames = ('id', 'name', 'number', 'position', 'image')
reader = csv.DictReader(csvfile, fieldnames, delimiter=",")
next(reader)  # skip header row

json.dump([row for row in reader], jsonfile, indent=4)

csvfile.close()
jsonfile.close()
# import csv
# import os

# with open('data.csv', 'r') as csvfile:
#     reader = csv.DictReader(csvfile, delimiter="\t")

#     for row in reader:
#         name = row['name']
#         last_word = name.split()[-1].lower()
#         old_filename = row['image']
#         new_filename = f"images/{last_word}.jpg"
#         row['image'] = new_filename

#         with open('output.csv', 'a', newline='') as outfile:
#             writer = csv.DictWriter(outfile, fieldnames=row.keys())
#             writer.writerow(row)

