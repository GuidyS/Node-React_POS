-- Mainmenu.sql (SQL Server Version)
-- สร้างตาราง MainMenu สำหรับบันทึกและปรับแก้ข้อมูลเมนูหลัก

IF OBJECT_ID('dbo.MainMenu', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.MainMenu (
        menu_id INT IDENTITY(1,1) PRIMARY KEY, -- รหัสเมนู
        menu_name NVARCHAR(100) NOT NULL,      -- ชื่อเมนู
        menu_description NVARCHAR(MAX),        -- รายละเอียดเมนู
        menu_price DECIMAL(10,2) NOT NULL,     -- ราคาเมนู
        menu_status NVARCHAR(20) NOT NULL DEFAULT 'available', -- สถานะเมนู
        created_at DATETIME NOT NULL DEFAULT GETDATE(),        -- วันที่สร้าง
        updated_at DATETIME NOT NULL DEFAULT GETDATE()         -- วันที่แก้ไขล่าสุด
    );

    -- เพิ่ม CHECK constraint สำหรับ menu_status
    ALTER TABLE dbo.MainMenu
    ADD CONSTRAINT CHK_menu_status CHECK (menu_status IN ('available', 'unavailable'));
END
GO

-- ตัวอย่างการเพิ่มข้อมูล
-- INSERT INTO dbo.MainMenu (menu_name, menu_description, menu_price, menu_status)
-- VALUES (N'ลาเต้', N'กาแฟลาเต้ร้อน', 55.00, 'available');
