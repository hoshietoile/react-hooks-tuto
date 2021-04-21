import React, { useEffect, useState } from 'react'
// dependencies
import clsx from 'clsx'
// material-ui
import { makeStyles, withTheme, withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import DownloadIcon from '@material-ui/icons/SystemUpdateAlt'
import FavoriteIcon from '@material-ui/icons/Favorite'
// templates
import GenericTemplate from './../templates/GenericTemplate'
// modules
import handleApi from './../../modules/handleApi'
import Api from './../../api/methods'
const api = new Api()

const IndexPage = ({ theme }) => {
  const classes = makeStyles({
    imageContainer: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    imageCard: {
      margin: theme.spacing(1),
      cursor: 'pointer',
      maxWidth: '216px',
      '&:hover': {
        boxShadow: '0px 4px 3px 3px rgb(0 0 0 / 14%)',
      },
      position: 'relative',
    },
    imageCardHeader: {
      '& span': {
        fontSize: '14px',
      },
    },
    imageCardIcons: {
      position: 'absolute',
      top: theme.spacing(0.5),
      right: theme.spacing(0.5),
      backgroundColor: '#eee',
      borderRadius: '4px',
    },
    imageCardIcon: {
      padding: theme.spacing(0.5),
    },
  })()
  const [images, setImages] = useState([])
  useEffect(async () => {
    const imageList = []
    await handleApi(
      api.getImages().then((res) => {
        res.data.data.forEach((datum) => {
          imageList.push(datum)
        })
        setImages(imageList)
      })
    )
  }, [])
  return (
    <GenericTemplate>
      <div className={classes.imageContainer}>
        {images.map((img) => (
          <Card className={classes.imageCard} key={img.id}>
            <CardHeader
              className={classes.imageCardHeader}
              title={img.title}
              action={
                <Grid container direction="row">
                  {/* <Typography color="textPrimary" component="p">
                    {}
                  </Typography> */}
                  <Grid className={classes.imageCardIcons}>
                    <IconButton className={classes.imageCardIcon}>
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton className={classes.imageCardIcon}>
                      <DownloadIcon />
                    </IconButton>
                    <IconButton className={classes.imageCardIcon}>
                      <MoreVertIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              }
            />
            <CardContent>
              <img src={img.src} width="180" height="180" />
              <Typography variant="body2" color="textSecondary" component="p">
                {img.description.slice(0, 20)}
              </Typography>
            </CardContent>
            <CardActions disableSpacing></CardActions>
          </Card>
        ))}
      </div>
    </GenericTemplate>
  )
}

export default withTheme(IndexPage)
