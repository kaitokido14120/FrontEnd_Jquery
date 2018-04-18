$(document).ready(function () {

    //Định nghĩa sự kiện click cho nút button #btnThemNguoiDung
    $("#btnThemNguoiDung").click(OpenPopupModal);



    //Xử lý cho sự kiện click đó
    function OpenPopupModal() {
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
    $("body").delegate("#btnDong", "click", function () {
        $("#btnDongForm").trigger("click");
    })

    var danhSachNguoiDung = new DanhSachNguoiDung();
    //Xử lý tác vụ thêm người dùng
    $("body").delegate("#btnThem", "click", function () {
        //Lấy thông tin người dùng nhập vào
        var taiKhoan = $("#TaiKhoan").val();
        var matKhau = $("#MatKhau").val();
        var hoTen = $("#HoTen").val();
        var email = $("#Email").val();
        var sodt = $("#SoDT").val();
        //Khởi tạo đối tượng người dùng
        var nguoiDung = new NguoiDung(taiKhoan, matKhau, hoTen, email, sodt);

        //Đưa người dùng vào thuộc tính là mảng danh sách người dùng 
        //Thuộc đối tượng danhSachNguoiDung
        danhSachNguoiDung.ThemNguoiDung(nguoiDung);
        console.log(nguoiDung);
        //Hiển thị sweetalert
        swal("OK!", "Thêm người dùng thành công!", "success");
        //Gọi sự kiện đóng form
        $("#btnDong").trigger("click");
        $(".txtF").val("");

        //Load dữ liệu người dùng ra datatable sau khi thêm
        LoadDanhSachNguoiDung(danhSachNguoiDung.DSND);
        var arrDiem = danhSachNguoiDung.TinhDiemNguoiDung();
       
        veBieuDo(arrDiem);
        //Lưu và storage
        LuuStorage();


    })

    //Load dữ liệu ra datatable
    function LoadDanhSachNguoiDung(DSND) {

        var noiDungDSND = "";
        for (var i = 0; i < DSND.length; i++) {
            var nguoiDung = DSND[i];

            noiDungDSND += `
                <tr class="trThongTinNguoiDung" 
                    data-taikhoan= "${nguoiDung.TaiKhoan}"
                    data-matkhau = "${nguoiDung.MatKhau}" 
                    data-hoten = "${nguoiDung.HoTen}"
                    data-email = "${nguoiDung.Email}"
                    data-sodt = "${nguoiDung.SoDT}"
                >
                    <td><input class="ckbXoaNguoiDung" type="checkbox" value="${nguoiDung.TaiKhoan}" /></td>
                    <td class="tdThongTinNguoiDung">${nguoiDung.TaiKhoan}</td>
                    <td class="tdThongTinNguoiDung">${nguoiDung.MatKhau}</td>
                    <td class="tdHoTen tdThongTinNguoiDung">${nguoiDung.HoTen}</td>
                    <td class="tdThongTinNguoiDung">${nguoiDung.Email}</td>
                    <td class="tdThongTinNguoiDung">${nguoiDung.SoDT}</td> 
                </tr>
            `;
        }
        $("#tblBodyDSND").html(noiDungDSND);
    }

    $("#txtTuKhoa").keyup(function () {
        var tuKhoa = $("#txtTuKhoa").val();
        //var tuKhoa = $(this).val();
        //Gọi phương thức tìm kiếm người dùng => trả là 1 danh sách người dùng chứa từ khóa
        var danhSachNguoiKQ = danhSachNguoiDung.TimKiemNguoiDung(tuKhoa);
        LoadDanhSachNguoiDung(danhSachNguoiKQ.DSND);
        HighLight(tuKhoa);
    });

    function HighLight(tuKhoa) {
        //tính độ dài từ khóa
        var doDaiTuKhoa = tuKhoa.length;
        //Duyệt tất cả td có class name là họ tên
        $(".tdHoTen").each(function () {
            //Lấy ra nội dung chuỗi kết quả
            var noiDungHTML = $(this).html();
            //Kiểm tra trong nội html của thẻ td.tdHoten có chứa từ khóa hay ko
            if (noiDungHTML.indexOf(tuKhoa) !== -1) {
                //Dùng hàm substring tạo chuỗi mới
                var viTriTuKhoa = noiDungHTML.indexOf(tuKhoa);
                var KetQuaMoi = `${noiDungHTML.substring(0, viTriTuKhoa)} 
                <span class ='highlight' >${tuKhoa}</span> ${noiDungHTML.substring(viTriTuKhoa + doDaiTuKhoa)}`;
                $(this).html(KetQuaMoi);
            }
        });
        jQuery(".highlight").NhapNhay(3);
    }


    $.fn.NhapNhay = function (time) {
        var This = $(this);
        for (var i = 0; i < time; i++) {
            This.fadeOut(1000);
            This.fadeIn(1000);
        }

    }


    function LuuStorage() {
        //Lưu mảng người dùng
        var jsonDSND = JSON.stringify(danhSachNguoiDung.DSND);
        localStorage.setItem("DanhSachNguoiDung", jsonDSND);
    }
    function LayStorage() {
        //Kiểm tra localstorage có dữ liệu hay không, có thì mới thực thi
        if(localStorage.getItem("DanhSachNguoiDung"))
        {
             //Lấy dữ liệu từ localstorage
            var jsonDSND = localStorage.getItem("DanhSachNguoiDung");
            danhSachNguoiDung.DSND = JSON.parse(jsonDSND);
            LoadDanhSachNguoiDung(danhSachNguoiDung.DSND);
        }
    }
    LayStorage();

    //Xử lý xóa người dùng
    $("#btnXoaNguoiDung").click(function () {
        $(".ckbXoaNguoiDung").each(function () {
            if ($(this).is(":checked")) //Kiểm input với classname= .ckbXoaNguoiDung được checked hay không
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
    $("body").delegate(".tdThongTinNguoiDung", "click", function () {
        //var This = $(this).closest(".trThongTinNguoiDung");
        var This = $(this).parent();//là thẻ cha tr của td đang được click
        var taiKhoan = This.attr("data-taikhoan");
        var matKhau = This.attr("data-matkhau");
        var hoTen = This.attr("data-hoten");
        var email = This.attr("data-email");
        var soDT = This.attr("data-sodt");
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
        $("#TaiKhoan").attr("readonly", true);

    })
    //Xử lý cập nhật dữ liệu thông qua nút lưu#btnCapNhatND
    $("body").delegate("#btnCapNhatND", "click", function () {
        var taiKhoan = $("#TaiKhoan").val();
        var matKhau = $("#MatKhau").val();
        var hoTen = $("#HoTen").val();
        var email = $("#Email").val();
        var soDT = $("#SoDT").val();
        //Tạo đối tượng lấy dữ liệu sau khi người dùng thay đổi (cập nhật)
        var nguoiDungEdit = new NguoiDung(taiKhoan, matKhau, hoTen, email, soDT);
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

    function veBieuDo(arrDiem) {
        Highcharts.chart('container', {

            title: {
                text: 'Danh sách điểm số người dùng'
            },

            subtitle: {
                text: 'Biểu đồ thống nạp điểm của người dùng'
            },

            yAxis: {
                title: {
                    text: 'Number of Employees'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },

            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 2010
                }
            },

            series: [{
                name: 'Installation',
                data: arrDiem
            }],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }


        })
    };












});