import React, {useState} from 'react';
import {Affix, Col, Layout, Menu, Row, Image} from 'antd';
import {
    // HomeOutlined,
    PoweroffOutlined,
    SearchOutlined,
    BulbFilled,
    BulbOutlined,
} from '@ant-design/icons';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {logout, toggleDarkMode} from '../redux/features/authSlice';
import {ItemType} from 'antd/es/menu/hooks/useItems';
import {MenuInfo} from 'rc-menu/lib/interface';
import routes from '../constants/routes';
import logo from '../assets/logo.webp';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {
    AiOutlineCoffee,
    CiLight,
    MdOutlineBadge,
    MdOutlineDarkMode,
    MdOutlineDashboard,
    MdOutlineWbSunny,
} from 'react-icons/all';

export interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = ({}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const {isDarkMode} = useAppSelector((state) => state.auth);

    const [collapsed, setCollapsed] = useState(
        localStorage.getItem('sidebarCollapsed') === 'true',
    );

    const handleLogout = () => {
        dispatch(logout());
    };

    const handleMenuClick = (menuInfo: MenuInfo) => {
        menuInfo.domEvent.preventDefault();
        navigate(menuInfo.key);
    };

    const handleCollapse = (value: boolean) => {
        setCollapsed(value);
        localStorage.setItem('sidebarCollapsed', value.toString());
    };

    const items: ItemType[] = [
        {
            key: routes.DASHBOARD,
            label: 'Dashboard',
            icon: <MdOutlineDashboard />,
            onClick: handleMenuClick,
        },
        {
            key: routes.DISPATCH,
            label: 'Dispatch',
            icon: <MdOutlineBadge />,
            onClick: handleMenuClick,
        },
    ];

    const getSelectedKeys = () => {
        switch (location.pathname) {
            case routes.DASHBOARD:
                return [routes.DASHBOARD];
            case routes.DISPATCH:
                return [routes.DISPATCH];
            default:
                return [];
        }
    };

    return (
        <Layout.Sider
            style={{
                height: '100vh',
                // grey if not dark mode
                backgroundColor: '#00082d',
            }}
            width={230}
            collapsible
            collapsed={collapsed}
            onCollapse={handleCollapse}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                }}
            >
                <Row style={{padding: '1em'}}>
                    <Col span={24}>
                        <Link to={routes.DASHBOARD}>
                            <Image
                                preview={false}
                                src={logo}
                                alt={'logo LSPD'}
                            />
                        </Link>
                    </Col>
                </Row>

                <Menu
                    style={{
                        marginTop: '1em',
                        border: 'none',
                        backgroundColor: 'transparent',
                    }}
                    items={items}
                    selectedKeys={getSelectedKeys()}
                    mode={'inline'}
                    theme={'dark'}
                />

                <div style={{flex: 1}} />

                <Menu
                    style={{border: 'none', backgroundColor: 'transparent'}}
                    selectable={false}
                    theme={'dark'}
                    items={[
                        {
                            key: 'logout',
                            label: 'Se déconnecter',
                            icon: <AiOutlineCoffee />,
                            onClick: handleLogout,
                        },
                        {
                            key: 'darkMode',
                            label: !isDarkMode ? 'Mode sombre' : 'Mode clair',
                            icon: !isDarkMode ? (
                                <MdOutlineDarkMode />
                            ) : (
                                <MdOutlineWbSunny />
                            ),
                            onClick: () => {
                                dispatch(toggleDarkMode());
                            },
                            style: {
                                display: 'flex',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                            },
                        },
                    ]}
                />
            </div>
        </Layout.Sider>
    );
};

export default Sidebar;
