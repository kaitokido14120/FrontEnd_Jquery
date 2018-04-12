$(document).ready(function() {

    //Định nghĩa sự kiện click cho nút button #btnThemNguoiDung
    $("#btnThemNguoiDung").click(OpenPopupModal);



    //Xử lý cho sự kiện click đó
    function OpenPopupModal()
    {   
        //Clear dữ liệu textbox.txtF
        $(".txtF").val("");
        //Tạo phần nội dung modal title
        var modalTile = "Thêm người dùng";
        //Tạo nội dung cho modal footer: Dùng string template
        var modalFooter = `
            <button id="btnThem" class="btn btn-success">Thêm người dùng </button>
            <button id="btnDong" class="btn btn-danger">Đóng </button>
        `;
       
        $(".modal-title").html(modalTile);
        $(".modal-footer").html(modalFooter);
        //Gọi nút open modal
        $("#btnPopupModal").trigger("click");
    }

    //Xử lý sự kiện cho nút đóng gọi nút đóng form của popupmodal
    $("body").delegate("#btnDong","click",function(){
        $("#btnDongForm").trigger("click");
    })

    var danhSachNguoiDung = new DanhSachNguoiDung();
    //Xử lý tác vụ thêm người dùng
    $("body").delegate("#btnThem","click",function(){
        //Lấy thông tin người dùng nhập vào
        var taiKhoan = $("#TaiKhoan").val();
        var matKhau = $("#MatKhau").val();
        var hoTen = $("#HoTen").val();
        var email = $("#Email").val();
        var sodt = $("#SoDT").val();
        //Khởi tạo đối tượng người dùng
        var nguoiDung = new NguoiDung(taiKhoan,matKhau,hoTen,email,sodt);
   
        //Đưa người dùng vào thuộc tính là mảng danh sách người dùng 
        //Thuộc đối tượng danhSachNguoiDung
        danhSachNguoiDung.ThemNguoiDung(nguoiDung);
        //Hiển thị sweetalert
        swal("OK!", "Thêm người dùng thành công!", "success");
        //Gọi sự kiện đóng form
        $("#btnDong").trigger("click");
        $(".txtF").val("");

        //Load dữ liệu người dùng ra datatable sau khi thêm
        LoadDanhSachNguoiDung(danhSachNguoiDung.DSND);
        //Lưu và storage
        LuuStorage();
  

    })

    //Load dữ liệu ra datatable
    function LoadDanhSachNguoiDung(DSND)
    {   
       
        var noiDungDSND = "";
        for(var i = 0 ; i<DSND.length ;i++)
        {
            var nguoiDung= DSND[i];
          
            noiDungDSND += `
                <tr class="trThongTinNguoiDung" 
                    data-taikhoan= "${nguoiDung.TaiKhoan}"
                    data-matkhau = "${nguoiDung.MatKhau}" 
                    data-hoten = "${nguoiDung.HoTen}"
                    data-email = "${nguoiDung.Email}"
                    data-sodt = "${nguoiDung.SoDT}"
                >
                    <td><input class="ckbXoaNguoiDung" type="checkbox" value="${nguoiDung.TaiKhoan}" /></td>
                    <td>${nguoiDung.TaiKhoan}</td>
                    <td>${nguoiDung.MatKhau}</td>
                    <td>${nguoiDung.HoTen}</td>
                    <td>${nguoiDung.Email}</td>
                    <td>${nguoiDung.SoDT}</td> 
                </tr>
            `;
        }
        $("#tblBodyDSND").html(noiDungDSND);
    }

    $("#txtTuKhoa").keyup(function(){
        
        var tuKhoa = $("#txtTuKhoa").val();
        console.log(tuKhoa);
        //var tuKhoa = $(this).val();
        //Gọi phương thức tìm kiếm người dùng => trả là 1 danh sách người dùng chứa từ khóa
        var danhSachNguoiKQ = danhSachNguoiDung.TimKiemNguoiDung(tuKhoa);
        LoadDanhSachNguoiDung(danhSachNguoiKQ.DSND);
    });

    function LuuStorage()
    {
        //Lưu mảng người dùng
        var jsonDSND = JSON.stringify(danhSachNguoiDung.DSND);
        localStorage.setItem("DanhSachNguoiDung",jsonDSND);
    }
    function LayStorage()
    {
        //Lấy dữ liệu từ localstorage
        var jsonDSND = localStorage.getItem("DanhSachNguoiDung");
        danhSachNguoiDung.DSND = JSON.parse(jsonDSND);
        LoadDanhSachNguoiDung(danhSachNguoiDung.DSND);
    }
    LayStorage();

    //Xử lý xóa người dùng
    $("#btnXoaNguoiDung").click(function(){
        $(".ckbXoaNguoiDung").each(function(){
            if($(this).is(":checked")) //Kiểm input với classname= .ckbXoaNguoiDung được checked hay không
            {
                //Nếu được checked thì lấy thuộc tính value của checkbox đó ra
                var taiKhoan = $(this).val();
               
                danhSachNguoiDung.XoaNguoiDung(taiKhoan);
            }
        });
        //Load lại danh sách người dùng
        LoadDanhSachNguoiDung(danhSachNguoiDung.DSND);
        LuuStorage();
    });

    //Cài đặt sự kiện click cho dòng tr
    $("body").delegate(".trThongTinNguoiDung","click",function(){
        var taiKhoan = $(this).attr("data-taikhoan");
        var matKhau = $(this).attr("data-matkhau");
        var hoTen = $(this).attr("data-hoten");
        var email = $(this).attr("data-email");
        var soDT = $(this).attr("data-sodt");
        //Gán dữ liệu vào popup
        $("#TaiKhoan").val(taiKhoan);
        $("#MatKhau").val(matKhau);
        $("#HoTen").val(hoTen);
        $("#Email").val(email);
        $("#SoDT").val(soDT);
        //Gọi popup hiển thị
        $("#btnPopupModal").trigger("click");
          //Tạo phần nội dung modal title
          var modalTile = "Cập nhật thông tin người dùng";
          //Tạo nội dung cho modal footer: Dùng string template
          var modalFooter = `
              <button id="btnCapNhatND" class="btn btn-success">Cập nhật </button>
              <button id="btnDong" class="btn btn-danger">Đóng </button>
          `;
          $(".modal-title").html(modalTile);
          $(".modal-footer").html(modalFooter);
         //Khóa input#TaiKhoan
         $("#TaiKhoan").attr("readonly",true);

    })
    //Xử lý cập nhật dữ liệu thông qua nút lưu#btnCapNhatND
    $("body").delegate("#btnCapNhatND","click",function(){
        var taiKhoan = $("#TaiKhoan").val();
        var matKhau = $("#MatKhau").val();
        var hoTen = $("#HoTen").val();
        var email = $("#Email").val();
        var soDT = $("#SoDT").val();
        //Tạo đối tượng lấy dữ liệu sau khi người dùng thay đổi (cập nhật)
        var nguoiDungEdit = new NguoiDung(taiKhoan,matKhau,hoTen,email,soDT);
        //Gọi phương thức cập nhật người dùng từ đối tượng danhSachNguoiDung
        danhSachNguoiDung.CapNhatThongTinNguoiDung(nguoiDungEdit);
        //Gọi load lại datatable nguoi dùng 
        LoadDanhSachNguoiDung(danhSachNguoiDung.DSND);
        console.log(danhSachNguoiDung.DSND);
        //Hiển thị sweetalert
        swal("OK!", "Cập nhật thông tin thành công!", "success");
        //Gọi sự kiện đóng form
        $("#btnDong").trigger("click");
        //Gọi phương thức lưu từ localstorage
        LuuStorage();

    })














});