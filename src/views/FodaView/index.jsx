import React from 'react';
import { Grid, IconButton } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Chip from '@mui/material/Chip';
import { COLORS } from 'helpers/enums/colors';

import {
  Container,
  CardTitleContainer,
  CardContent,
  CardTitle,
  AddButton,
  FactoresContainer,
  FactorContent,
  FactorDescription,
  ButtonContainer,
  TitleContainer,
  Title,
  ChipContainer,
} from './styles';
import Button from 'components/commons/Button';

const FodaView = ({
  onAdd,
  debilidades,
  amenazas,
  oportunidades,
  fortalezas,
  onEdit,
  onDelete,
  title,
  showResults = false,
  onClickButton,
  buttonTitle,
  total = {},
}) => {
  const renderTitle = (title, onAdd, total) => (
    <CardTitleContainer>
      <CardTitle>{title}</CardTitle>
      {!showResults ? (
        <AddButton onClick={onAdd}>
          <AddCircleRoundedIcon />
        </AddButton>
      ) : (
        <ChipContainer>
          <Chip label={total} />
        </ChipContainer>
      )}
    </CardTitleContainer>
  );

  const renderFactores = (factores) =>
    factores.map((factor) => (
      <FactorContent>
        <FactorDescription>{factor.descripcion}</FactorDescription>
        {!showResults ? (
          <>
            <IconButton size="small" onClick={() => onEdit(factor)}>
              <EditIcon />
            </IconButton>
            <IconButton size="small" onClick={() => onDelete(factor)}>
              <DeleteIcon />
            </IconButton>
          </>
        ) : (
          <Chip label={factor.puntuacion} />
        )}
      </FactorContent>
    ));

  return (
    <Container>
      <TitleContainer>
        <Title>{showResults ? `Resultados de ${title}` : title}</Title>
        <ButtonContainer>
          <Button onClick={onClickButton}>{buttonTitle}</Button>
        </ButtonContainer>
      </TitleContainer>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={2}
        height={'100%'}
        sx={{ padding: '30px 0' }}
      >
        <Grid item xs={12} md={6} display={'flex'}>
          <CardContent backgroundcolor={COLORS.GreenEmerald}>
            {renderTitle(
              'Fortalezas',
              () => onAdd('Fortaleza'),
              total.fortalezas
            )}
            <FactoresContainer>{renderFactores(fortalezas)}</FactoresContainer>
          </CardContent>
        </Grid>
        <Grid item xs={12} md={6} display={'flex'}>
          <CardContent backgroundcolor={COLORS.GreenSulu}>
            {renderTitle(
              'Oportunidades',
              () => onAdd('Oportunidad'),
              total.oportunidades
            )}
            <FactoresContainer>
              {renderFactores(oportunidades)}
            </FactoresContainer>
          </CardContent>
        </Grid>
        <Grid item xs={12} md={6} display={'flex'}>
          <CardContent backgroundcolor={COLORS.YellowGrandis}>
            {renderTitle(
              'Debilidades',
              () => onAdd('Debilidad'),
              total.debilidades
            )}
            <FactoresContainer>{renderFactores(debilidades)}</FactoresContainer>
          </CardContent>
        </Grid>
        <Grid item xs={12} md={6} display={'flex'}>
          <CardContent backgroundcolor={COLORS.RedBurntSienna}>
            {renderTitle('Amenazas', () => onAdd('Amenaza'), total.amenazas)}
            <FactoresContainer>{renderFactores(amenazas)}</FactoresContainer>
          </CardContent>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FodaView;
