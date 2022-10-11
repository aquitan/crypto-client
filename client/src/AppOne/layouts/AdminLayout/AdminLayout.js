import React, {useState} from 'react'
import {Outlet} from "react-router-dom";
import cls from './AdminLayout.module.scss'
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import NavigationLink from "../../components/UI/NavigationLink/NavigationLink";
import BurgerMenu from "../../components/UI/BurgerMenu/BurgerMenu";
import {store} from "../../../index";
import {Col, Container, Navbar, Row} from 'react-bootstrap';


const AuthLayout = () => {
    const [state, setState] = useState(false)

    const setInactive = () => {
        setState(false)
    }

    const onHandleClick = () => {
        setState(true)
    }

    return (
      <>

          <Navbar className='d-flex d-xl-none' bg="black" variant="dark" style={{position: 'sticky'}}>
              <Container>
                  <Row>
                      <Col className='d-flex align-items-center'>
                          <BurgerMenu onHandleClick={onHandleClick} open={state} /> <div className='mx-2'>Menu</div>
                      </Col>
                  </Row>
              </Container>
          </Navbar>
          <div className={`${cls.layout} bg-dark`}>
              <div className={cls.layout_inner}>
                  <AdminSidebar active={state} setInactive={setInactive}>
                      <NavigationLink onClick={() => setState(false)} to={'/'}>User Dashboard</NavigationLink>
                      <NavigationLink onClick={() => setState(false)} to={'/staff'}>Главная</NavigationLink>
                      <NavigationLink onClick={() => setState(false)} to={'/staff/users'}>Пользователи</NavigationLink>
                      <NavigationLink onClick={() => setState(false)} to={'/staff/create-user'}>Создать пользователя</NavigationLink>
                      <NavigationLink onClick={() => setState(false)} to={'/staff/staff-kyc'}>KYC</NavigationLink>
                      <NavigationLink onClick={() => setState(false)} to={'/staff/promocodes'}>Промокоды</NavigationLink>
                      <NavigationLink onClick={() => setState(false)} to={'/staff/wallets'}>Кошельки</NavigationLink>
                      <NavigationLink onClick={() => setState(false)} to={'/staff/staff-errors'}>Ошибки</NavigationLink>
                      <NavigationLink onClick={() => setState(false)} to={'/staff/domains'}>Домены</NavigationLink>
                      <NavigationLink onClick={() => setState(false)} to={'/staff/transactions'}>Создать транзакцию</NavigationLink>
                      <NavigationLink onClick={() => setState(false)} to={'/staff/secure-deal'}>Защищенные сделки</NavigationLink>
                      <NavigationLink onClick={() => setState(false)} to={'/staff/trading'}>Трейдинг</NavigationLink>
                      {
                          store.isAdmin || store.fullAccess ?
                            <NavigationLink onClick={() => setState(false)} to={'/staff/recruiter-list'}>Рекрутинг</NavigationLink>
                            : null
                      }
                      <NavigationLink onClick={() => setState(false)} to={'/staff/create-news'}>Создать новости</NavigationLink>
                      <NavigationLink onClick={() => setState(false)} to={'/staff/chat'}>Чат</NavigationLink>
                      <NavigationLink onClick={() => setState(false)} to={'/staff/group-list'}>Список групп</NavigationLink>
                      <NavigationLink onClick={() => setState(false)} to={'/staff/project-support'}>Поддержка</NavigationLink>
                  </AdminSidebar>
                  <div className={cls.content_wrap}>
                      <Outlet/>
                  </div>

              </div>
          </div>
      </>

    )
}

export default AuthLayout