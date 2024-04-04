resource "aws_s3_bucket" "recipe_bucket" {
  bucket = "my-recipe-app"
  tags = {
    Name = "recipe-bucket"
  }
 
}

resource "aws_s3_bucket_policy" "recipe_bucket_policy" {
  bucket = aws_s3_bucket.recipe_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Principal = "*" 
        Action    = "s3:GetObject"  
        Resource  = "${aws_s3_bucket.recipe_bucket.arn}/*"  
      }
    ]
  })
}
resource "aws_s3_bucket_public_access_block" "recipe_bucket" {
  bucket = aws_s3_bucket.recipe_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}
resource "aws_s3_bucket_website_configuration" "recipe_bucket" {
bucket = aws_s3_bucket.recipe_bucket.id
index_document {
    suffix = "index.html"
  }
  error_document {
    key = "error.html"
  }

}