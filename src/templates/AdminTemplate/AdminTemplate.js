import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { NavLink } from "react-router-dom";
import _ from "lodash";
import { history } from "../../App";
import { USE_LOGIN, TOKEN } from "../../util/settings/config";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';


const { Header, Content, Footer, Sider } = Layout;



const AdminTemplate = (props) => { //path, exact, Component
    const { SubMenu } = Menu;

    const { Component, ...restProps } = props;
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = collapsed => {

        setCollapsed(collapsed);
    };

    useEffect(() => {
        window.scrollTo(0, 0);

    })

    if (!localStorage.getItem(USE_LOGIN)) {
        alert('Bạn không có quyền truy cập vào trang này !')
        return <Redirect to='/' />
    }

    if (userLogin.maLoaiNguoiDung !== 'QuanTri') {
        alert('Bạn không có quyền truy cập vào trang này !')
        return <Redirect to='/' />

    }

    const operations = <Fragment>
        {!_.isEmpty(userLogin) ? <Fragment> <button onClick={() => {
            history.push('/profile')
        }}> <div style={{ width: 40, height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '20px' }} className="text-2xl ml-5 rounded-full bg-red-200">{userLogin.taiKhoan.substr(0, 1)}</div></button>
            <button onClick={() => {
                localStorage.removeItem(USE_LOGIN);
                localStorage.removeItem(TOKEN);
                history.push('/home');
                window.location.reload();
            }} className="text-blue-800">Đăng xuất</button> </Fragment> : ''}
    </Fragment>

    if (window.innerWidth > 414) {
        return <Route {...restProps} render={(propsRoute) => { //props.location,props.history,props.match

            return <Fragment>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                        <NavLink to='/' className="logo p-5" style={{ cursor: 'pointer' }} >
                            <img src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" style={{ height: '40px', paddingLeft: '15px' }} alt="..." />
                        </NavLink>
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="1" icon={<UserOutlined />}>
                                <NavLink to="/admin/users">Users</NavLink>
                            </Menu.Item>
                            <SubMenu key="sub1" icon={<FileOutlined />} title="Films">
                                <Menu.Item key="10" icon={<FileOutlined />}>
                                    <NavLink to="/admin/films">Films</NavLink>
                                </Menu.Item>
                                <Menu.Item key="11" icon={<FileOutlined />}>
                                    <NavLink to="/admin/films/addnew">Add new</NavLink>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<FileOutlined />} title="QL Người Dùng">
                                <Menu.Item key="12" icon={<FileOutlined />}>
                                    <NavLink to="/admin/quanlynguoidung">QL Người Dùng</NavLink>
                                </Menu.Item>
                                <Menu.Item key="13" icon={<FileOutlined />}>
                                    <NavLink to="/admin/quanlynguoidung/themnguoidung">Thêm Người Dùng</NavLink>
                                </Menu.Item>
                            </SubMenu>

                        </Menu>
                    </Sider>
                    <Layout className="site-layout">
                        <Header className="site-layout-background" style={{ padding: 0 }} >

                            <div className="text-right pr-10 pt-1">{operations}</div>
                        </Header>
                        <Content style={{ margin: '0 16px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                            </Breadcrumb>
                            <div className="site-layout-background" style={{ padding: 24, minHeight: '85vh' }}>
                                <Component {...propsRoute} />
                            </div>
                        </Content>

                    </Layout>
                </Layout>
            </Fragment>
        }} />
    }
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <div className="text-gray-600 body-font" style={{ backgroundColor: 'rgb(0 21 41)' }}>
                <div className="container mx-auto flex flex-wrap flex-col md:flex-row items-center" style={{ padding: '20px 0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <NavLink to='/' className="logo" style={{ cursor: 'pointer' }} >
                            <img src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" style={{ height: '40px' }} alt="..." />
                        </NavLink>
                        <div>{operations}</div>
                    </div>
                </div>
                <Menu mode="inline" style={{ width: '100%' }}>
                    <SubMenu key="sub1" icon={<MailOutlined />} title="Admin">
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            <NavLink to="/admin/users">Users</NavLink>
                        </Menu.Item>

                        <SubMenu key="g2" title="Films">
                            <Menu.Item key="2" icon={<FileOutlined />}>
                                <NavLink to="/admin/films">Films</NavLink>
                            </Menu.Item>
                            <Menu.Item key="3" icon={<FileOutlined />}>
                                <NavLink to="/admin/films/addnew">Add new</NavLink>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="g3" title="Quản Lý Người Dùng">
                            <Menu.Item key="4" icon={<FileOutlined />}>
                                <NavLink to="/admin/quanlynguoidung">QL Người Dùng</NavLink>
                            </Menu.Item>
                            <Menu.Item key="5" icon={<FileOutlined />}>
                                <NavLink to="/admin/quanlynguoidung/themnguoidung">Thêm Người Dùng</NavLink>
                            </Menu.Item>
                        </SubMenu>
                    </SubMenu>
                </Menu>
            </div>

        </Layout>
    )
}


export default AdminTemplate;