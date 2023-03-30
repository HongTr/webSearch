import csv

# Open the CSV file for reading
with open('data.csv', 'r') as csvfile:
    reader = csv.DictReader(csvfile)

    # Open a new CSV file for writing with an additional column for the image filename
    with open('data.csv', 'w', newline='') as outfile:
        fieldnames = reader.fieldnames + ['image_filename']
        writer = csv.DictWriter(outfile, fieldnames=fieldnames)
        writer.writeheader()

        # Iterate over each row in the input CSV file, add the image filename, and write to the output CSV file
        for row in reader:
            lastname = row['name'].split()[-1].lower() # Get the last name and convert to lowercase
            image_filename = f"{lastname}.jpg"
            row['image_filename'] = image_filename
            writer.writerow(row)
