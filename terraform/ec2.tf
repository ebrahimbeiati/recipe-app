resource "aws_instance" "web" {
  ami           = "ami-051f8a213df8bc089"  # Specify the correct AMI ID here
  instance_type = "t3.micro"

  tags = {
    Name = "recipe-app"
  }
  key_name = "recipe-app"
  security_groups = [aws_security_group.web_sg.name]
}


resource "aws_security_group" "web_sg" {
  name        = "WebSecurityGroup"
  description = "Allow SSH and HTTP access"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] 
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] 
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]  
  }
}
