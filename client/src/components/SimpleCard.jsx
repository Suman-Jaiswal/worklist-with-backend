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
        width: 300,
        padding: 0
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    pos: {
        marginBottom: 12,
        fontSize: '14px'
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

                    <div className={`${classes.title} d-flex justify-content-between text-secondary `}>
                        {sno}
                        <div>
                            {
                                plan.author.email === user.email ?
                                    <Dropdown >
                                        <Dropdown.Toggle className='p-0' size='sm' variant="transparent" id="dropdown-basic">
                                            <FontAwesomeIcon className='mb-2 text-secondary' icon={faEllipsisH} />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu >
                                            <div> <EditPlanBtn plan={plan} /></div>
                                            <div> <ShareBtn plan={plan} /></div>
                                            <div>
                                                {
                                                    plan.author.email === user.email && <DeletePlanBtn id={plan._id} title={plan.title} />
                                                }
                                            </div>

                                        </Dropdown.Menu>
                                    </Dropdown> :
                                    <div style={{ fontSize: '16px' }} className="text-secondary fw-bold">shared by: {plan.author.givenName}</div>
                            }
                        </div>
                    </div>

                    <Link className='text-decoration-none text-dark' to={`/plan/${plan._id}`}  >

                        <Typography variant="h6">
                            {plan.title}
                        </Typography>

                        <Typography className={classes.pos} color="textSecondary">
                            {plan.description}
                        </Typography>

                        <Typography className={classes.pos} color="textSecondary">
                            {' Topics: '} {filteredTopics.length},
                            <span className='text-danger' style={{float: 'right'}} >
                               {
                               progress===100? <FontAwesomeIcon size='lg' icon={faCheckCircle} className='text-success'/> : ' left: ' + filteredTopics.filter(x => x.completed===false).length
                               }
                            </span>
                        </Typography>

                        <div className='py-1' >
                            <ProgressBar now={progress} label={`${progress}%`} />
                        </div>

                    </Link>

                </CardContent>

            </Card>
        </div>

    );
}
