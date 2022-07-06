import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Dropdown, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DeletePlanBtn from './DeletePlanBtn';
import { useState, useEffect } from 'react';
import { PlanContext } from '../contexts/PlanContext';
import { AuthContext } from '../contexts/AuthContext';
import EditPlanBtn from './EditPlanBtn';
import ShareBtn from './ShareBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles({
    root: {
        width: 280,
        padding: 0,
        backgroundColor: '#363636',
        overflow: 'visible',
        margin: "auto"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 13,
        // fontWeight: 'bold',
    },
    pos: {
        marginTop: 5,
        marginBottom: 5,
        fontSize: 12
    },
});

export default function SimpleCard({ plan, sno }) {

    const { user } = useContext(AuthContext).state
    const { topics } = useContext(PlanContext).state
    const [progress, setProgress] = useState(null)
    const [filteredTopics, setFilteredTopics] = useState([])
    const classes = useStyles();

    useEffect(() => {
        setFilteredTopics(topics.filter(topic => topic.planID === plan._id))
    }, [plan, topics])


    useEffect(() => {
        const completed = filteredTopics.filter(x => x.completed === true).length
        const total = filteredTopics.length
        const now = Math.floor((completed / total) * 100)
        setProgress(now)
    }, [plan, topics, filteredTopics])



    return (
        <div>
            <Card className={classes.root}>

                <CardContent className='p-3'>

                    <div className={`${classes.title} d-flex justify-content-between  `}>
                        <div className='text-light'>
                            {sno}
                        </div>

                        <div className='text-light'>
                            {plan.title}
                        </div>
                        <div>
                            {
                                plan.author.email === user.email ?
                                    <Dropdown >
                                        <Dropdown.Toggle className='p-0' size='sm' variant="transparent" id="dropdown-basic">
                                            <FontAwesomeIcon className='mb-2 text-light' icon={faEllipsisH} />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu style={{ padding: 0 }}>
                                            <div className='text-dark'> <EditPlanBtn plan={plan} /></div>
                                            <div className='text-dark'> <ShareBtn plan={plan} /></div>
                                            <div>
                                                {
                                                    plan.author.email === user.email && <DeletePlanBtn id={plan._id} title={plan.title} />
                                                }
                                            </div>

                                        </Dropdown.Menu>
                                    </Dropdown> :
                                    <div style={{ fontSize: '13px' }} className="text-light fw-bold">shared by: {plan.author.givenName}</div>
                            }
                        </div>
                    </div>

                    <Link className='text-decoration-none text-light' to={`/plan/${plan._id}`}  >

                        <Typography className={classes.pos} >
                            {plan.description}
                        </Typography>

                        <Typography className={classes.pos}>
                            {' Topics: '} {filteredTopics.length}
                            <span className='text-danger' style={{ float: 'right' }} >
                                {
                                    progress === 100 ? <FontAwesomeIcon size='lg' icon={faCheckCircle} className='text-success' /> : ' left: ' + filteredTopics.filter(x => x.completed === false).length
                                }
                            </span>
                        </Typography>

                        <div className='py-2 d-flex align-items-center' >
                            <div className='pe-3' style={{ fontSize: '11px' }}>{progress}%</div>
                            <ProgressBar style={{
                                backgroundColor: '#282828',
                                height: 3,
                                fontSize: 0,
                                width: "95%"
                            }} now={progress} label={`${progress}%`} />
                        </div>

                    </Link>

                </CardContent>

            </Card>
        </div>

    );
}
