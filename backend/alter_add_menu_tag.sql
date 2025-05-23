-- เพิ่มคอลัมน์ menu_tag สำหรับเก็บประเภทเมนู (อาหาร/เครื่องดื่ม/ของหวาน) ในตาราง MainMenu
ALTER TABLE dbo.MainMenu
ADD menu_tag NVARCHAR(50) NULL;
