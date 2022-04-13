import { Fragment, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../logo/Logo';
import { signout, siteTemplatePost } from '../../apis/requests';
import { windowTop } from '../../apis/requests'
import { ChangeCourse } from '../../apis/requests';
import { Authenticated } from '../../apis/requests';
import { toggleBulb } from '../../apis/requests';
import { setDarkMode } from '../../apis/requests';
import './index.scss'

function Menu({ items, links, longer = '', courses, coursesDrop, bulb}) {

  let history = useHistory();
  const [toggle, setToggle] = useState(false)
  let itemsMenu = items
  const { token } = Authenticated()

  const handleClick = () => {
    history.push("/");
  }

  const changeCourse = async(id) => {
    ChangeCourse(token, id, history)
  }

  const listMap = (array) => {
    if(array) {
      return array.map((li, id) => (
          <Link onClick={() => windowTop()} to={`${li.link}`} key={id} className='item'><li>{li.name}</li></Link>
      ))
    } else {
      return null
    }
  }

  const [save, setSave] = useState(false)

  const linksMap = (array) => {
    if(array) {
      return array.map((li, id) => {
        if(li.link === 'creator') {
          return (
            <div style={{cursor: 'pointer'}} onClick={() => {
              setSave(true)
              siteTemplatePost(token, li.data, li.id)
              .then(() => setSave(false))
            }} key={id} className={li.type}>{!save ? li.name : 'carregando...'}</div>
          )
        } else {
          return (
            <a href={li.link} key={id} onClick={li.onclick !== undefined ? async() => {
              await signout(handleClick)
            } : () => {}} className={li.type}>{li.name}</a>
          )
        }
      })
    } else {
      return null
    }
  }

  return (
    <Fragment>
    <div id='creatorMenu' style={{fontFamily: 'Poppins'}}>
      <div className="menu-content">
        <Logo link='/dashboard' />
        <div className="menuToggle">
          <div className="space"></div>
          <div className="toggle" onClick={() => setToggle(!toggle)}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
          <div className={toggle ? `spaceBetween open ${longer}` : 'spaceBetween close'}>
            <div className="space"></div>
            <div className="items">
              <ul>
                {listMap(itemsMenu)}
              </ul>
            </div>
            <div className="register">
              <div className="divider"></div>
              {bulb &&
                <div className='bulb' onClick={async() => toggleBulb(setDarkMode)}>💡</div>              
              }
              {courses && (
                <div className="drop">
                  <div className='courses' style={{backgroundImage: `url(${coursesDrop?.courses[coursesDrop?.current]?.image})`}}></div>
                  <div className='coursesList' style={coursesDrop?.courses?.length > 1 ? {} : {display: 'none'}}>
                    {
                      coursesDrop?.courses.filter(course => course.name !== coursesDrop?.courses[coursesDrop?.current]?.name).map((course, i) => {
                        return (
                          <div className='course' onClick={() => changeCourse(course._id)} key={i}>
                            <div className='image' style={{backgroundImage: `url(${course.image})`}}></div>
                            {course.name}
                          </div>
                        )
                      })
                    }

                  </div>
                </div>
              )}
              {linksMap(links)}
            </div>
          </div>
        </div>
        
      </div>
    </div>
    </Fragment>
  );
}

export default Menu;