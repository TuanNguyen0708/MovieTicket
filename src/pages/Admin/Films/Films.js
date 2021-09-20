import React, { Fragment, useEffect } from 'react'
import { Button, Table } from 'antd';
import { Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachPhimAction, xoaPhimAction } from '../../../redux/actions/QuanLyPhimActions';
import { EditOutlined,DeleteOutlined, CalendarOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom';
import { history } from '../../../App';


const { Search } = Input;

export default function Films() {
    const {arrPhimDefault} = useSelector(state=>state.QuanLyPhimReducer)
    const dispatch = useDispatch()
    useEffect(()=> {
        dispatch(layDanhSachPhimAction());
    },[])

const onSearch = value => {
    //Gọi API layDanhSachPhim
    dispatch(layDanhSachPhimAction(value))
}

const columns = [
    {   
        width:'10%',
        title: 'Mã Phim',
        dataIndex: 'maPhim',
        value: (text, object) => {return <span>{text}</span>},
        sorter:(a,b) => a.maPhim - b.maPhim,
        sortDirections: ['descend','ascend'],
        // sortOder: 'descend'
    },
    {
        width:'10%',
        title: 'Hình Ảnh',
        dataIndex: 'hinhAnh',
        render: (text, phim, index) => {return <Fragment>
            <img src={phim.hinhAnh} style={{width:50, height:50}} onError={(e)=> {e.target.onError = null; e.target.src=`https://picsum.photos/id/${index}/50/50`}} />
        </Fragment>}

    },
    {
        width:'25%',
        title: 'Tên Phim',
        dataIndex: 'tenPhim',
        sorter:(a,b) => {
            let tenPhimA = a.tenPhim.toLowerCase().trim();
            let tenPhimB = b.tenPhim.toLowerCase().trim();
            if(tenPhimA > tenPhimB){
                return 1
            }
            return -1
        },
        sortDirections: ['descend','ascend'],
    },
    {
        width:'40%',
        title: 'Mô Tả',
        dataIndex: 'moTa',
        sorter:(a,b) => {
            let moTaA = a.moTa.toLowerCase().trim();
            let moTaB = b.moTa.toLowerCase().trim();
            if(moTaA > moTaB){
                return 1
            }
            return -1
        },
        render: (text,phim) => {
            return <Fragment>
                {phim.moTa.length > 50 ? phim.moTa.substr(0,150) + '...' : phim.moTa}
            </Fragment>
        },
        sortDirections: ['descend','ascend'],
    },
    {
        width:'10%',
        title: 'Hành Động',
        dataIndex: 'hanhDong',
        render: (text,phim) => {
            return <div style={{display:'flex',flexDirection:'row', justifyContent:'space-between'}}>
                <NavLink key={1} to={`/admin/films/edit/${phim.maPhim}/${phim.tenPhim}`} className='text-green-500 text-2xl'><EditOutlined /></NavLink>
                <span style={{cursor:'pointer'}} key={2} className='text-red-500 text-2xl' onClick={()=> {
                    //Gọi action Xóa
                    if(window.confirm('Bạn có chắc muốn xóa phim ' + phim.tenPhim)) {
                        //Gọi action 
                        dispatch(xoaPhimAction(phim.maPhim))
                    }
                }}><DeleteOutlined /></span>
                <NavLink key={3} to={`/admin/films/showtime/${phim.maPhim}/${phim.tenPhim}`} className='text-green-500 text-2xl'><CalendarOutlined /></NavLink>
            </div>
        },
    },
];
const data = arrPhimDefault;

function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
}




    return (
        <div>
            <h3 className='text-4xl'>Quản Lý Phim</h3>
            <Button className='mb-3' onClick={()=> {
                history.push('/admin/films/addnew')
            }}>Thêm Phim</Button>
            <Search
                className='mb-5'
                placeholder="input search text"
                enterButton="Search"
                size="large"
                onSearch={onSearch}
            />
            <Table columns={columns} dataSource={data} onChange={onChange} rowKey={'maPhim'} />
        </div>
    )
}
