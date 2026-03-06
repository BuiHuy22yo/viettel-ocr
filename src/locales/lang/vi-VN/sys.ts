export default {
  api: {
    operationSuccess: 'Thao tác thành công',
    operationFailed: 'Thao tác thất bại',
    errorTip: 'Thông báo lỗi',
    successTip: 'Thông báo thành công',
    errorMessage: 'Thao tác thất bại, hệ thống gặp sự cố!',
    timeoutMessage: 'Đăng nhập hết thời gian, vui lòng đăng nhập lại!',
    apiTimeoutMessage: 'Yêu cầu giao diện hết thời gian, vui lòng làm mới trang và thử lại!',
    apiRequestFailed: 'Yêu cầu giao diện thất bại, vui lòng thử lại sau!',
    networkException: 'Lỗi mạng',
    networkExceptionMsg: 'Vui lòng kiểm tra kết nối mạng của bạn! Mạng không ổn định',

    errMsg401: 'Người dùng không có quyền (lỗi token, tên người dùng, mật khẩu)!',
    errMsg403: 'Người dùng đã được ủy quyền, nhưng truy cập bị cấm!',
    errMsg404: 'Lỗi yêu cầu mạng, tài nguyên không được tìm thấy!',
    errMsg405: 'Lỗi yêu cầu mạng, phương pháp yêu cầu không được phép!',
    errMsg408: 'Yêu cầu mạng hết thời gian!',
    errMsg500: 'Lỗi máy chủ, vui lòng liên hệ quản trị viên!',
    errMsg501: 'Mạng chưa được triển khai!',
    errMsg502: 'Lỗi mạng!',
    errMsg503: 'Dịch vụ không khả dụng, máy chủ tạm thời quá tải hoặc đang bảo trì!',
    errMsg504: 'Hết thời gian mạng!',
    errMsg505: 'Phiên bản HTTP không hỗ trợ yêu cầu!',
  },
  app: {
    logoutTip: 'Nhắc nhở',
    logoutMessage: 'Xác nhận thoát khỏi hệ thống?',
    menuLoading: 'Đang tải menu...',
  },
  errorLog: {
    tableTitle: 'Danh sách lỗi',
    tableColumnType: 'Loại',
    tableColumnDate: 'Thời gian',
    tableColumnFile: 'Tệp',
    tableColumnMsg: 'Thông báo lỗi',
    tableColumnStackMsg: 'Thông tin ngăn xếp',

    tableActionDesc: 'Chi tiết',

    modalTitle: 'Chi tiết lỗi',

    fireVueError: 'Kích hoạt lỗi Vue',
    fireResourceError: 'Kích hoạt lỗi tài nguyên',
    fireAjaxError: 'Kích hoạt lỗi Ajax',

    enableMessage: 'Chỉ có hiệu lực khi useErrorHandle=true trong `/src/settings/projectSetting.ts`.',
  },
  exception: {
    backLogin: 'Quay lại đăng nhập',
    backHome: 'Quay lại trang chủ',
    subTitle403: 'Xin lỗi, bạn không có quyền truy cập trang này.',
    subTitle404: 'Xin lỗi, trang bạn truy cập không tồn tại.',
    subTitle500: 'Xin lỗi, máy chủ gặp lỗi.',
    noDataTitle: 'Không có dữ liệu trên trang hiện tại.',
    networkErrorTitle: 'Lỗi mạng',
    networkErrorSubTitle: 'Xin lỗi, kết nối mạng của bạn đã bị ngắt, vui lòng kiểm tra mạng của bạn!',
  },
  lock: {
    unlock: 'Nhấp để mở khóa',
    alert: 'Mật khẩu khóa màn hình sai',
    backToLogin: 'Quay lại đăng nhập',
    entry: 'Vào hệ thống',
    placeholder: 'Vui lòng nhập mật khẩu khóa màn hình hoặc mật khẩu người dùng',
  },
  login: {
    backSignIn: 'Quay lại đăng nhập',
    mobileSignInFormTitle: 'Đăng nhập bằng di động',
    qrSignInFormTitle: 'Đăng nhập bằng mã QR',
    signInFormTitle: 'Đăng nhập',
    signUpFormTitle: 'Đăng ký',
    forgetFormTitle: 'Đặt lại mật khẩu',

    signInTitle: 'Hệ thống quản lý hậu trường',
    signInDesc: 'Nhập thông tin cá nhân của bạn và bắt đầu!',
    policy: 'Tôi đồng ý với Chính sách bảo mật của xxx',
    scanSign: `quét mã để hoàn tất đăng nhập`,

    loginButton: 'Đăng nhập',
    registerButton: 'Đăng ký',
    rememberMe: 'Nhớ tôi',
    forgetPassword: 'Quên mật khẩu?',
    otherSignIn: 'Đăng nhập bằng',

    // thông báo
    loginSuccessTitle: 'Đăng nhập thành công',
    loginSuccessDesc: 'Chào mừng bạn trở lại',

    // placeholder
    accountPlaceholder: 'Vui lòng nhập tên người dùng',
    passwordPlaceholder: 'Vui lòng nhập mật khẩu',
    smsPlaceholder: 'Vui lòng nhập mã SMS',
    mobilePlaceholder: 'Vui lòng nhập số di động',
    policyPlaceholder: 'Đăng ký sau khi kiểm tra',
    diffPwd: 'Hai mật khẩu không khớp',

    userName: 'Tên người dùng',
    password: 'Mật khẩu',
    confirmPassword: 'Xác nhận mật khẩu',
    email: 'Email',
    smsCode: 'Mã SMS',
    mobile: 'Di động',
  },
};
