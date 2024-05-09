from google.cloud import storage

storage_client = storage.Client()

bucket_name = "sobel"
source_file_name = "image/Image.jpg"
destination_file_name = "pre-sobel/image.jpg"

bucket = storage_client.bucket(bucket_name)

# Subo una imagen al bucket
blob = bucket.blob(destination_file_name)
blob.upload_from_filename(source_file_name)

print(
    f"File {source_file_name} uploaded to {destination_file_name}."
)

# Descargo una imagen del bucket
blob = bucket.blob(destination_file_name)
blob.download_to_filename("image/Image-bucket.jpg")

print(
    "Downloaded storage object {} from bucket {} to local file {}.".format(
        source_file_name, bucket_name, destination_file_name
    )
)
