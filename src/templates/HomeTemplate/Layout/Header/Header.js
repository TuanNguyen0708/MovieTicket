import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { history } from '../../../../App';
import { Select } from 'antd';
import _ from 'lodash';

//Hook đa ngôn ngữ
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { TOKEN, USE_LOGIN } from '../../../../util/settings/config';


const { Option } = Select;
export default function Header(props) {
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)
    const { t, i18n } = useTranslation();
    const handleChange = (value) => {
        i18n.changeLanguage(value)
    }
    const renderLogin = () => {
        if (_.isEmpty(userLogin)) {
            return <Fragment>
                <button className="nav-item mr-3 text-white" style={{ border: '1px solid #fff', padding: '10px 15px', borderRadius: '5px' }} onClick={() => { history.push('/register') }} >{t('signin')}</button>
                <button className="nav-item text-white" style={{ border: '1px solid #fff', padding: '10px 15px', borderRadius: '5px' }} onClick={() => {
                    history.push('/login')
                }} >{t('signup')}</button>
            </Fragment>
        }
        return <Fragment>
            <button className="nav-item mr-3 text-white" style={{ border: '1px solid #fff', padding: '10px 15px', borderRadius: '5px' }} onClick={() => { history.push('/login') }} >Hello ! {userLogin.taiKhoan}</button>
            <button className='text-white' style={{ border: '1px solid #fff', padding: '10px 15px', borderRadius: '5px' }} onClick={() => {
                localStorage.removeItem(USE_LOGIN);
                localStorage.removeItem(TOKEN);
                history.push('/home');
                window.location.reload();
            }}>{t('signout')}</button>
        </Fragment>
    }
    return (
        <div className="fixed w-full navbar navbar-expand-lg navbar-light  bg-opacity-40 bg-black" style={{ display: 'flex', justifyContent: 'space-around', width: '100%', zIndex: '20' }}>
            <NavLink to='/' aria-label="Back to homepage" className="flex items-center p-2">
                <img src='https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png' alt='cyberlearn' />
            </NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown" style={{ justifyContent: 'space-between' }}>
                <ul className="navbar-nav" style={{ margin: '10px 10%' }}>
                    <li className="nav-item active" style={{ padding: '10px 0' }}>
                        <NavLink to='/home' className="flex items-center -mb-0.5 border-b-2 px-2 py-2 mr-4 border-transparent text-violet-600 boder-violet-600 text-white" activeClassName='border-b-2 border-white'>{t('home')}</NavLink>
                    </li>
                    <li className="nav-item" style={{ padding: '10px 0' }}>
                        <NavLink to='/contact' className="flex items-center -mb-0.5 border-b-2 px-2 py-2 mr-4 border-transparent text-white" activeClassName='border-b-2 border-white'>{t('contact')}</NavLink>
                    </li>
                    <li className="nav-item" style={{ padding: '10px 0' }}>
                        <NavLink to='/news' className="flex items-center -mb-0.5 border-b-2 px-2 py-2 mr-4 border-transparent text-white" activeClassName='border-b-2 border-white'>{t('news')}</NavLink>
                    </li>
                </ul>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', paddingRight: '10px' }}>
                        {renderLogin()}
                    </div>
                    <Select defaultValue="en" style={{ width: 100 }} onChange={handleChange}>
                        <Option value="en">English</Option>
                        <Option value="vi">Việt Nam</Option>
                        <Option value="chi">China</Option>
                    </Select>
                </div>
            </div>
        </div>
    )
}
