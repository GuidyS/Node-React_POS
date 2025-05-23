-- เพิ่มคอลัมน์ image_url สำหรับเก็บ URL รูปภาพในตาราง MainMenu
ALTER TABLE dbo.MainMenu
ADD image_url NVARCHAR(255) NULL;
