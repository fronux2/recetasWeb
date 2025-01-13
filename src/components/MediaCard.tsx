import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface MediaCardProps {
  title: string;
  description: string;
  id: string;
  url: string;
}

const MediaCard: React.FC<MediaCardProps> = ({ title, description, id, url }) => {
  const navigate = useNavigate();

  const handleLearnMoreClick = () => {
    navigate(`/recipe/${id}`);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={url}
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button sx={{ color: 'text.secondary' }}  size="small" onClick={handleLearnMoreClick}>Ir a la receta</Button>
      </CardActions>
    </Card>
  );
};

export default MediaCard;
