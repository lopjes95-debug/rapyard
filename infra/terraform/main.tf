terraform {
  required_version = '>= 1.6.0'
  required_providers {
    aws = {
      source  = 'hashicorp/aws'
      version = '~> 5.0'
    }
  }
}

provider 'aws' {
  region = var.aws_region
}

variable 'aws_region' {
  type    = string
  default = 'us-east-1'
}

resource 'aws_vpc' 'rapyard' {
  cidr_block = '10.0.0.0/16'
  tags = { Name = 'rapyard-vpc' }
}
