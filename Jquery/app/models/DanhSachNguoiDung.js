function DanhSachNguoiDung()
{
    this.DSND = [];
    this.ThemNguoiDung = function(nguoiDung){
        this.DSND.push(nguoiDung);
    }
    this.TinhDiemNguoiDung = function ()
    {
        var arrDiem = [];
        for(var i = 0; i<this.DSND.length; i++)
        {
            arrDiem.push(this.DSND[i].Diem);
        }
        return arrDiem;
    }
    //Phương thức tìm kiếm người dùng theo họ tên
    this.TimKiemNguoiDung = function(tuKhoa)
    {
        //Loại bỏ khoảng trống đầu cuối
        tuKhoa = tuKhoa.trim();
        //Chuyển chuỗi thành chữ thường
        tuKhoa = tuKhoa.toLowerCase();
        //Tạo đối tượng danhSachNguoiDungKetQua
        var danhSachNguoiDungKQ = new DanhSachNguoiDung();
        for(var i=0; i < this.DSND.length ; i++)
        {
            var nguoiDung = this.DSND[i];
            if(nguoiDung.HoTen.toLowerCase().trim().search(tuKhoa) !== -1)
            {
                danhSachNguoiDungKQ.ThemNguoiDung(nguoiDung);
            }
        }
        return danhSachNguoiDungKQ;
    }
    //Phương thức tìm người dùng theo tài khoản
    this.TimNguoiDungTheoTaiKhoan = function (TaiKhoan)
    {
        for(var i = 0; i< this.DSND.length ; i++)
        {
            
            var nguoiDung = this.DSND[i];
            //So sánh người dùng trong mảng và taikhoan thì trả ra giá trị index
            if(nguoiDung.TaiKhoan === TaiKhoan)
            {
                return i;
            }

        }
        return -1;
    }
    //Phương thức xóa danh sách người dùng
    this.XoaNguoiDung = function(taiKhoan)
    {
       //Tìm được vị trí của người dùng trong mảng danh sách người dùng (this.DSND)
       var index = this.TimNguoiDungTheoTaiKhoan(taiKhoan);
       if(index !== -1) //Tìm được index != -1 (Có nghĩa là tìm được vị trí)
       {
           //Tiến hành xóa object ở vị trí đó
            this.DSND.splice(index,1);
       }
    }
    //Phương thức chỉnh sửa người dùng
    this.CapNhatThongTinNguoiDung = function(nguoiDungEdit)
    {
       //Tìm được vị trí của người dùng trong mảng danh sách người dùng (this.DSND)
       var index = this.TimNguoiDungTheoTaiKhoan(nguoiDungEdit.TaiKhoan);
       var nguoiDungCapNhat = this.DSND[index];
       nguoiDungCapNhat.MatKhau = nguoiDungEdit.MatKhau;
       nguoiDungCapNhat.HoTen = nguoiDungEdit.HoTen;
       nguoiDungCapNhat.Email = nguoiDungEdit.Email;
       nguoiDungCapNhat.SoDT = nguoiDungEdit.SoDT;
    }
}