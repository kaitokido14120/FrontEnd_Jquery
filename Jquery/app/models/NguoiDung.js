function NguoiDung(taiKhoan,matKhau,hoTen,email,soDT)
{
    this.TaiKhoan = taiKhoan;
    this.MatKhau = matKhau;
    this.HoTen = hoTen;
    this.Email = email;
    this.SoDT = soDT;
    this.Diem = Math.floor((Math.random() * 10) + 1);;
}