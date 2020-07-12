import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import { Layout, Menu, Breadcrumb } from 'antd';
import * as actions from '../../store/actions/auth';

const { Header, Content, Footer } = Layout;

const customLayout = (props) => {
    return (
        <Layout className="layout">
        <Header>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            
            {
                props.isAuthenticated ?
                <Menu.Item key="2" onClick={props.logout}>
                    Logout
                </Menu.Item>

                :

                <Menu.Item key="2">
                    <Link to="/login">Login</Link> 
                </Menu.Item>

            }
                
            <Menu.Item key="1">
                <Link to="/"> Post </Link>  
            </Menu.Item>
            </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/">List</Link></Breadcrumb.Item>
            
            </Breadcrumb>
            <div className="site-layout-content">
            {props.children}
            </div>
        </Content>
        </Layout>
    )
}


// const mapStateToProps = (state) => {
//     return {
//         loading:state.loading,
//         error:state.error
//     }
// }

const mapDispatchToProps = dispath => {
    return {
        logout : () => dispath(actions.logout())
    }
}

export default withRouter(connect(null,mapDispatchToProps)(customLayout))