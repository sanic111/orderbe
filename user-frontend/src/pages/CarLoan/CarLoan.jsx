import React, { useState, useEffect, } from 'react';
import { useTranslation } from 'react-i18next';
import axios from '../../axios';
import './CarLoan.css';
import { numberToWords } from '../../utils/numberToWords';
import FlashyButton from './FlashyButton';
import { toast } from 'react-toastify';
const CarLoanPage = () => {
    const { t } = useTranslation();
    const [loanAmount, setLoanAmount] = useState('');
    const [loanTerm, setLoanTerm] = useState('1');
    const [interestRate, setInterestRate] = useState('5');
    const [paymentType, setPaymentType] = useState('declining');
    const [schedule, setSchedule] = useState([]);
    const [totalInterest, setTotalInterest] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);
    const [registrationType, setRegistrationType] = useState('');
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        phone: '',
        address: '',
    });
    const [activeSection, setActiveSection] = useState('procedures');
    const [loanAmountInWords, setLoanAmountInWords] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [currentResultIndex, setCurrentResultIndex] = useState(-1);


    // Hàm định dạng số
    const formatNumber = (value) => {
        const number = value.replace(/[^\d]/g, '');
        return number.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    // Hàm xử lý thay đổi khoản vay
    const handleLoanAmountChange = (e) => {
        const formattedValue = formatNumber(e.target.value);
        setLoanAmount(formattedValue);
        const pureNumber = getPureNumber(formattedValue);
        setLoanAmountInWords(numberToWords(pureNumber));
    };

    // Hàm để lấy giá trị số thuần túy
    const getPureNumber = (value) => {
        return parseInt(value.replace(/\./g, ''), 10);
    };

    useEffect(() => {
        calculateLoan();
    }, [loanAmount, loanTerm, interestRate, paymentType]);

    const calculateLoan = () => {
        const pureAmount = getPureNumber(loanAmount);
        let newSchedule = [];
        let totalInt = 0;
        let totalPay = pureAmount;
        let remainingBalance = pureAmount;
        const monthlyRate = interestRate / 12 / 100;
        const totalMonths = loanTerm * 12;

        if (paymentType === 'declining') {
            const principalPayment = pureAmount / totalMonths;
            for (let month = 1; month <= totalMonths; month++) {
                const interest = remainingBalance * monthlyRate;
                const total = principalPayment + interest;
                totalInt += interest;
                totalPay += interest;
                newSchedule.push({
                    month,
                    beginningBalance: remainingBalance,
                    principal: principalPayment,
                    interest,
                    total,
                });
                remainingBalance -= principalPayment;
            }
        } else {
            const monthlyPayment = (pureAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
            for (let month = 1; month <= totalMonths; month++) {
                const interest = remainingBalance * monthlyRate;
                const principal = monthlyPayment - interest;
                totalInt += interest;
                newSchedule.push({
                    month,
                    beginningBalance: remainingBalance,
                    principal,
                    interest,
                    total: monthlyPayment,
                });
                remainingBalance -= principal;
            }
        }

        setSchedule(newSchedule);
        setTotalInterest(totalInt);
        setTotalPayment(totalPay);
    };

    const handleRegistration = (type) => {
        setRegistrationType(type);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/car-loan-registration', {
                ...formData,
                registrationType,
                loanAmount,
                loanTerm,
                interestRate,
                paymentType,
            });
            toast.success("Tạo bài viết mới thành công!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
            setRegistrationType('');
            setFormData({ fullname: '', email: '', phone: '', address: '' });
        } catch (error) {
            console.error('Error submitting registration:', error);
            toast.error(t('REGISTRATION_ERROR'), {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
        }
    };

    // Hàm định dạng giá tiền
    const formatCurrency = (value) => {
        if (!value || isNaN(value)) return '-';
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
        }).format(value);
    };

    // Hàm xử lý thay đổi lãi suất
    const handleInterestRateChange = (e) => {
        let value = parseFloat(e.target.value);
        if (isNaN(value)) {
            value = 5; // Giá trị mặc định nếu input không hợp lệ
        } else {
            // Giới hạn giá trị trong khoảng từ 5% đến 20%
            value = Math.max(5, Math.min(20, value));
        }
        setInterestRate(value);
    };

    // Hàm xử lý thay đổi thời hạn vay
    const handleLoanTermChange = (e) => {
        let value = parseInt(e.target.value, 10);
        if (isNaN(value) || value < 1) {
            value = 1; //Giá trị tối thiểu là 1 năm
        } else if (value > 10) {
            value = 10; // Giá trị tối đa là 10 năm
        }
        setLoanTerm(value);
    };
    const handleApplyLoan = () => {
        setActiveSection('registration');
    };

    // xử lý tìm kiếm
    const performSearch = () => {
        const carLoanContent = document.getElementById('car-loan-content');
        if (!carLoanContent || !searchTerm.trim()) {
            setSearchResults([]);
            setCurrentResultIndex(-1);
            return;
        }

        const text = carLoanContent.innerText;
        const regex = new RegExp(searchTerm, 'gi');
        const matches = [...text.matchAll(regex)];
        setSearchResults(matches);
        setCurrentResultIndex(matches.length > 0 ? 0 : -1);

        highlightResults();
    };

    const highlightResults = () => {
        const contentElement = document.getElementById('car-loan-content');

        // Remove existing highlights
        contentElement.querySelectorAll('.highlight').forEach(el => {
            el.outerHTML = el.innerHTML;
        });

        if (searchResults.length > 0) {
            const walker = document.createTreeWalker(contentElement, NodeFilter.SHOW_TEXT, null, false);
            let node;
            const nodesToReplace = [];

            while (node = walker.nextNode()) {
                const parent = node.parentNode;
                if (parent.nodeName !== 'SCRIPT' && parent.nodeName !== 'STYLE') {
                    const matches = [...node.textContent.matchAll(new RegExp(searchTerm, 'gi'))];
                    if (matches.length > 0) {
                        nodesToReplace.push({ node, matches });
                    }
                }
            }

            nodesToReplace.forEach(({ node, matches }) => {
                const fragment = document.createDocumentFragment();
                let lastIndex = 0;

                matches.forEach((match, i) => {
                    if (match.index > lastIndex) {
                        fragment.appendChild(document.createTextNode(node.textContent.slice(lastIndex, match.index)));
                    }
                    const span = document.createElement('span');
                    span.className = 'highlight';
                    if (i === currentResultIndex) {
                        span.classList.add('current-highlight');
                    }
                    span.textContent = match[0];
                    fragment.appendChild(span);
                    lastIndex = match.index + match[0].length;
                });

                if (lastIndex < node.textContent.length) {
                    fragment.appendChild(document.createTextNode(node.textContent.slice(lastIndex)));
                }

                node.parentNode.replaceChild(fragment, node);
            });

            const currentHighlight = contentElement.querySelector('.current-highlight');
            if (currentHighlight) {
                currentHighlight.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }
    };
    const navigateResults = (direction) => {
        if (searchResults.length === 0) return;

        let newIndex;
        if (direction === 'next') {
            newIndex = (currentResultIndex + 1) % searchResults.length;
        } else {
            newIndex = (currentResultIndex - 1 + searchResults.length) % searchResults.length;
        }
        setCurrentResultIndex(newIndex);
        highlightResults();
    };


    return (
        <div className="container-fluid">
            <div className="row content">
                <div className="col-sm-3 sidenav">
                    <h4></h4>
                    <ul className="nav nav-pills nav-stacked">
                        <li className={activeSection === 'procedures' ? 'active' : ''}>
                            <a href="#" onClick={() => setActiveSection('procedures')}>{t('LOAN.LOAN_PROCEDURES')}</a>
                        </li>
                        <li className={activeSection === 'calculator' ? 'active' : ''}>
                            <a href="#" onClick={() => setActiveSection('calculator')}>{t('LOAN.LOAN_CALCULATOR')}</a>
                        </li>
                        <li className={activeSection === 'registration' ? 'active' : ''}>
                            <a href="#" onClick={() => setActiveSection('registration')}>{t('LOAN.REGISTRATION_OPTIONS')}</a>
                        </li>
                    </ul><br />
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder={t('LOAN.SEARCH_PLACEHOLDER')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && performSearch()}
                        />
                        <div className="input-group-btn">
                            <button className="btn btn-default" type="button" onClick={performSearch}>
                                <span className="glyphicon glyphicon-search"></span>
                            </button>
                            {searchResults.length > 0 && (
                                <>
                                    <button className="btn btn-default" onClick={() => navigateResults('prev')}>
                                        <span className="glyphicon glyphicon-chevron-up"></span>
                                    </button>
                                    <button className="btn btn-default" onClick={() => navigateResults('next')}>
                                        <span className="glyphicon glyphicon-chevron-down"></span>
                                    </button>
                                    <span className="search-result-count">
                                        {currentResultIndex + 1}/{searchResults.length}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="col-sm-9" id="car-loan-content">
                    {activeSection === 'procedures' && (
                        <section id="loan-procedures">
                            <h2>{t('LOAN.CAR_LOAN_PROCEDURES')}</h2>
                            <ol className="loan-steps">
                                <li>
                                    <h3>{t('LOAN.PROCEDURE_STEP_1')}</h3>
                                    <p>{t('LOAN.PROCEDURE_STEP_1_DETAIL')}</p>
                                </li>
                                <li>
                                    <h3>{t('LOAN.PROCEDURE_STEP_2')}</h3>
                                    <p>{t('LOAN.PROCEDURE_STEP_2_DETAIL')}</p>
                                </li>
                                <li>
                                    <h3>{t('LOAN.PROCEDURE_STEP_3')}</h3>
                                    <p>{t('LOAN.PROCEDURE_STEP_3_DETAIL')}</p>
                                </li>
                                <li>
                                    <h3>{t('LOAN.PROCEDURE_STEP_4')}</h3>
                                    <p>{t('LOAN.PROCEDURE_STEP_4_DETAIL')}</p>
                                </li>
                                <li>
                                    <h3>{t('LOAN.PROCEDURE_STEP_5')}</h3>
                                    <p>{t('LOAN.PROCEDURE_STEP_5_DETAIL')}</p>
                                </li>
                                <li>
                                    <h3>{t('LOAN.PROCEDURE_STEP_6')}</h3>
                                    <p>{t('LOAN.PROCEDURE_STEP_6_DETAIL')}</p>
                                </li>
                            </ol>
                            <div className="loan-note">
                                <h4>{t('LOAN.SPECIAL_NOTE')}</h4>
                                <p>{t('LOAN.SPECIAL_NOTE_DETAIL')}</p>
                            </div>
                            <div className="more-info">
                                <p>{t('LOAN.MORE_INFO')} <a href={t('LOAN.MORE_INFO_LINK')} target="_blank" rel="noopener noreferrer">{t('LOAN.MORE_INFO_TEXT')}</a></p>
                            </div>
                        </section>
                    )}

                    {activeSection === 'calculator' && (
                        <section id="loan-calculator">
                            <h2>{t('LOAN.LOAN_CALCULATOR')}</h2>
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="calculator-container">
                                        <div className="input-section">
                                            <div className="input-group">
                                                <label>{t('LOAN.LOAN_AMOUNT')}</label>
                                                <input
                                                    type="text"
                                                    value={loanAmount}
                                                    onChange={handleLoanAmountChange}
                                                />
                                                <span className="amount-in-words">{loanAmountInWords}</span>
                                            </div>
                                            <div className="input-group">
                                                <label>{t('LOAN.LOAN_TERM')}</label>
                                                <div className="input-with-unit">
                                                    <input
                                                        type="number"
                                                        value={loanTerm}
                                                        onChange={handleLoanTermChange}
                                                        min="1"
                                                        step="1"
                                                    />

                                                </div>
                                            </div>
                                            <div className="input-group">
                                                <label>{t('LOAN.INTEREST_RATE')}</label>
                                                <div className="input-with-unit">
                                                    <input
                                                        type="number"
                                                        value={interestRate}
                                                        onChange={handleInterestRateChange}
                                                        min="0"
                                                        max="100"
                                                        step="5"
                                                    />
                                                    <span className="input-unit">%</span>
                                                </div>
                                            </div>
                                            <div className="input-group">
                                                <label>{t('LOAN.PAYMENT_TYPE')}</label>
                                                <select
                                                    value={paymentType}
                                                    onChange={(e) => setPaymentType(e.target.value)}
                                                >
                                                    <option value="declining">{t('LOAN.DECLINING_BALANCE')}</option>
                                                    <option value="fixed">{t('LOAN.FIXED_PAYMENT')}</option>
                                                </select>
                                            </div>
                                            <div className="apply-loan-button-container">
                                                <FlashyButton onClick={handleApplyLoan}>
                                                    {t('LOAN.APPLY_FOR_LOAN')}
                                                </FlashyButton>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-9">
                                    <div className="results-section">
                                        <h3>{t('LOAN.CALCULATION_RESULTS')}</h3>
                                        <div className="result-item">
                                            <label>{t('LOAN.TOTAL_INTEREST')}</label>
                                            <div className="result-value">{formatCurrency(totalInterest)}</div>
                                        </div>
                                        <div className="result-item">
                                            <label>{t('LOAN.TOTAL_PAYMENT')}</label>
                                            <div className="result-value">{formatCurrency(totalPayment)}</div>
                                        </div>
                                    </div>

                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>{t('LOAN.MONTH')}</th>
                                                    <th>{t('LOAN.BEGINNING_BALANCE')}</th>
                                                    <th>{t('LOAN.PRINCIPAL')}</th>
                                                    <th>{t('LOAN.INTEREST')}</th>
                                                    <th>{t('LOAN.TOTAL')}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {schedule.map((row) => (
                                                    <tr key={row.month}>
                                                        <td>{row.month}</td>
                                                        <td>{formatCurrency(row.beginningBalance.toFixed(2))}</td>
                                                        <td>{formatCurrency(row.principal.toFixed(2))}</td>
                                                        <td>{formatCurrency(row.interest.toFixed(2))}</td>
                                                        <td>{formatCurrency(row.total.toFixed(2))}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                    {activeSection === 'registration' && (
                        <section id="registration-options">
                            <h2>{t('LOAN.REGISTRATION_OPTIONS')}</h2>
                            <div className="registration-buttons">
                                <button
                                    className={`btn ${registrationType === 'home' ? 'btn-success' : 'btn-primary'}`}
                                    onClick={() => handleRegistration('home')}
                                >
                                    {t('LOAN.HOME_VISIT')}
                                </button>
                                <button
                                    className={`btn ${registrationType === 'office' ? 'btn-success' : 'btn-primary'}`}
                                    onClick={() => handleRegistration('office')}
                                >
                                    {t('LOAN.OFFICE_VISIT')}
                                </button>
                            </div>

                            {registrationType && (
                                <form onSubmit={handleSubmit} className="registration-form">
                                    <h3>{t('LOAN.REGISTRATION_FORM')}</h3>
                                    <div className="form-group">
                                        <label htmlFor="fullname">{t('LOAN.FULLNAME')}</label>
                                        <input type="text" id="fullname" name="fullname" value={formData.fullname} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">{t('LOAN.EMAIL')}</label>
                                        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">{t('LOAN.PHONE')}</label>
                                        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="address">{t('LOAN.ADDRESS')}</label>
                                        <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} required />
                                    </div>

                                    <button type="submit" className="btn btn-success">{t('LOAN.SUBMIT')}</button>
                                </form>
                            )}
                        </section>

                    )}
                </div>
            </div>
        </div>
    );
};

export default CarLoanPage;