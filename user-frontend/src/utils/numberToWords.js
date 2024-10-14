const units = ['', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
const tens = ['', 'mười', 'hai mươi', 'ba mươi', 'bốn mươi', 'năm mươi', 'sáu mươi', 'bảy mươi', 'tám mươi', 'chín mươi'];
const scales = ['', 'nghìn', 'triệu', 'tỷ', 'nghìn tỷ', 'triệu tỷ'];

function readTens(number) {
    const ten = Math.floor(number / 10);
    const one = number % 10;
    let result = tens[ten];

    if (ten > 1 && one === 1) {
        result += ' mốt';
    } else if (one === 5 && ten >= 1) {
        result += ' lăm';
    } else if (one > 0 || ten === 0) {
        result += ' ' + units[one];
    }

    return result.trim();
}

function readHundreds(number) {
    const hundred = Math.floor(number / 100);
    const remainder = number % 100;
    let result = '';

    if (hundred > 0) {
        result += units[hundred] + ' trăm';
        if (remainder === 0) return result.trim();

        const ten = Math.floor(remainder / 10);
        if (ten === 0) {
            result += ' linh'; // Thay 'lẻ' bằng 'linh'
        }
    }

    if (remainder > 0) {
        result += ' ' + readTens(remainder);
    }

    return result.trim();
}

export function numberToWords(number) {
    if (number < 50000000) {
        return 'Số tiền không hợp lệ. Vui lòng nhập số từ 50 triệu đồng trở lên.';
    }
    else if (number > 1000000000) {
        return 'Số tiền không hợp lệ. Tối đa chỉ được vay 1 tỷ đồng.';
    }

    if (number === 0) return 'không đồng';

    let result = '';
    let scaleIndex = 0;

    while (number > 0) {
        const segment = number % 1000;
        if (segment > 0) {
            let segmentWords = readHundreds(segment);
            // Xử lý đặc biệt cho số 1 ở hàng nghìn
            if (scaleIndex === 1 && segment === 1) {
                segmentWords = 'một';
            }
            // Xử lý đặc biệt cho số 10 trở lên ở hàng nghìn
            else if (scaleIndex === 1 && segment >= 10) {
                segmentWords = readHundreds(segment);
            }
            // Các trường hợp khác
            else if (scaleIndex > 1 || segment > 1) {
                segmentWords = readHundreds(segment);
            }
            result = segmentWords + ' ' + scales[scaleIndex] + ' ' + result;
        } else if (scaleIndex > 0 && number > 1000) {
            result = scales[scaleIndex] + ' ' + result;
        }
        number = Math.floor(number / 1000);
        scaleIndex++;
    }

    return result.trim() + ' đồng';
}