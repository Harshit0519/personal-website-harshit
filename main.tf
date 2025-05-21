provider "google" {
  project = var.project_id
  region  = var.region
}

resource "google_storage_bucket" "website_bucket" {
  name                        = "${var.project_id}-bucket"
  location                    = var.region
  force_destroy               = true
  uniform_bucket_level_access = true

  website {
    main_page_suffix = "index.html"
    not_found_page   = "index.html"
  }
}

resource "google_storage_bucket_iam_binding" "public_access" {
  bucket = google_storage_bucket.website_bucket.name
  role   = "roles/storage.objectViewer"
  members = ["allUsers"]
}

locals {
  files = [
    "index.html",
    "style.css",
    "script.js"
  ]

  content_types = {
    "html" = "text/html"
    "css"  = "text/css"
    "js"   = "application/javascript"
  }
}

resource "google_storage_bucket_object" "website_files" {
  for_each     = toset(local.files)
  name         = each.key
  source       = each.key
  bucket       = google_storage_bucket.website_bucket.name
  content_type = lookup(local.content_types, split(".", each.key)[1], "application/octet-stream")
}
