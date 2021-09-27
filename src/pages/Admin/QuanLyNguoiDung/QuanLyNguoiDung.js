import React from 'react'
import { Button, Table } from 'antd';
import { Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { history } from '../../../App';
import { layDanhSachNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungAction';
import { Fragment } from 'react';
import { useEffect } from 'react';
import { EditOutlined,DeleteOutlined } from '@ant-design/icons'



const { Search } = Input;
export default function QuanLyNguoiDung() {
    const { danhSachNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer)
    console.log(danhSachNguoiDung, 'a')
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(layDanhSachNguoiDungAction());
    }, [])
    const onSearch = value => {
        //Gọi API layDanhSachNguoiDung
        dispatch(layDanhSachNguoiDungAction(value))
    }
    // const columns = [
    //     {
    //         width: '10%',
    //         title: 'STT',
    //         dataIndex: 'STT',
    //         render: ()=> {
    //             let data=[];
    //         for(let i=0; i< danhSachNguoiDung.length; i++){
    //             //console.log(i);
    //             //console.log(danhSachNguoiDung.length);
    //             data.push(i+1);
    //         }
    //         return data;

    //         }
    //     },
    //     {
    //         width:'15%',
    //         title: 'Tài Khoản',
    //         dataIndex: 'taiKhoan',
    //         sorter:(a,b) => {
    //             let taiKhoanA = a.taiKhoan.toLowerCase().trim();
    //             let taiKhoanB = b.taiKhoan.toLowerCase().trim();
    //             if(taiKhoanA > taiKhoanB){
    //                 return 1
    //             }
    //             return -1
    //         },
    //         sortDirections: ['descend','ascend'],
    //     },
    //     {
    //         width:'20%',
    //         title: 'Họ Tên',
    //         dataIndex: 'hoTen',
    //         sorter:(a,b) => {
    //             let hoTenA = a.hoTen.toLowerCase().trim();
    //             let hoTenB = b.hoTen.toLowerCase().trim();
    //             if(hoTenA > hoTenB){
    //                 return 1
    //             }
    //             return -1
    //         },
    //         sortDirections: ['descend','ascend'],
    //     },
    //     {
    //         width:'25%',
    //         title: 'Email',
    //         dataIndex: 'email',
    //         sorter:(a,b) => {
    //             let emailA = a.email.toLowerCase().trim();
    //             let emailB = b.email.toLowerCase().trim();
    //             if(emailA > emailB){
    //                 return 1
    //             }
    //             return -1
    //         },
    //         sortDirections: ['descend','ascend'],
    //     },
    //     {
    //         width:'25%',
    //         title: 'Số Điện Thoại',
    //         dataIndex: 'soDt',
    //         sortDirections: ['descend','ascend'],
    //     },
    //     {
    //         width:'25%',
    //         title: 'Mật Khẩu',
    //         dataIndex: 'matKhau',
    //         sortDirections: ['descend','ascend'],
    //     },
    //     {
    //         width:'25%',
    //         title: 'Loại Người Dùng',
    //         dataIndex: 'maLoaiNguoiDung',
    //         sortDirections: ['descend','ascend'],
    //     },

    // ];
    const columns2 = [
        {
            width:'5%',
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            sorter:(a,b) => {
                let sttA = a.stt
                let sttB = b.stt
                if(sttA > sttB){
                    return 1
                }
                return -1
            },
        },
        {
            width:'15%',
            title: 'Họ Tên',
            dataIndex: 'name',
            key: 'name',
            sorter:(a,b) => {
                let NameA = a.name.toLowerCase().trim();
                let NameB = b.name.toLowerCase().trim();
                if(NameA > NameB){
                    return 1
                }
                return -1
            },
            
        },
        {
            width:'15%',
            title: 'Tài Khoản',
            dataIndex: 'account',
            key: 'account',
            sorter:(a,b) => {
                let AccountA = a.account.toLowerCase().trim();
                let AccountB = b.account.toLowerCase().trim();
                if(AccountA > AccountB){
                    return 1
                }
                return -1
            },
        },
        {
            width:'15%',
            title: 'Mật Khẩu',
            dataIndex: 'password',
            key: 'password',
        },
        {
            width:'15%',
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter:(a,b) => {
                let emailA = a.email.toLowerCase().trim();
                let emailB = b.email.toLowerCase().trim();
                if(emailA > emailB){
                    return 1
                }
                return -1
            }
        },
        {
            width:'15%',
            title: 'Số Điện Thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            width:'15%',
            title: 'Loại Người Dùng',
            dataIndex: 'type',
            key: 'type',
            sorter:(a,b) => {
                let typeA = a.type.toLowerCase().trim();
                let typeB = b.type.toLowerCase().trim();
                if(typeA > typeB){
                    return 1
                }
                return -1
            }
        },
        {
            width:'10%',
            title: 'Hành Động',
            dataIndex: 'hanhDong',
            render: (text,nguoiDung) => {
                return <div style={{display:'flex',flexDirection:'row', justifyContent:'space-between'}}>
                    <NavLink key={1} to={`/admin/quanlynguoidung/editnguoidung/${nguoiDung.account}`} className='text-green-500 text-2xl'><EditOutlined /></NavLink>
                    <span style={{cursor:'pointer'}} key={2} className='text-red-500 text-2xl' onClick={()=> {
                        //Gọi action Xóa
                        if(window.confirm('Bạn có chắc muốn xóa phim ' + nguoiDung.tenPhim)) {
                            //Gọi action 
                            
                        }
                    }}><DeleteOutlined /></span>
                </div>
            },
        },
    ];
    const buildDataSource = (danhSachNguoiDung) => {
        const data = [];
        for (let index = 0; index < danhSachNguoiDung.length; index++) {
            const element = danhSachNguoiDung[index];
            data.push({
                stt: index + 1,
                name: element.hoTen,
                account: element.taiKhoan,
                email: element.email,
                phone: element.soDt,
                type: element.maLoaiNguoiDung,
                password: element.matKhau
            });
        }
        return data;
    }
    const data = buildDataSource(danhSachNguoiDung);

    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }
    return (
        <div >
            <h3 className='text-4xl'>Quản Lý Người Dùng</h3>
            <Button className='mb-3' onClick={() => {
                history.push('/admin/quanlynguoidung/themnguoidung')
            }}>Thêm Người Dùng</Button>
            <Search
                className='mb-5'
                placeholder="input search text"
                enterButton="Search"
                size="large"
                onSearch={onSearch}
            />
            <Table columns={columns2} dataSource={data} onChange={onChange} />
        </div>
    )
}
