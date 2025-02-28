import React from 'react';
import {
  ButtonsContainer,
  CardTitle,
  CreateContent,
} from 'views/PorterView/styles';
import Button from 'components/commons/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { ArrowBack } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { ButtonContainer } from 'views/FodaView/styles';
import { tooltips } from 'views/PorterView/tooltips';
import ToolTip from 'components/commons/ToolTip';

const PorterViewResults = ({
  consejo,
  activeStep,
  handleBack,
  handleNext,
  steps,
  titulo,
  onClickButtonGoBack,
  openComments,
  goToHub,
}) => {
  return (
    <CreateContent sx={{ gap: '0px' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          justifyContent: 'space-between',
        }}
      >
        <IconButton size="small" onClick={onClickButtonGoBack}>
          <ArrowBack />
        </IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '30%' }}>
          <CardTitle sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{titulo}</CardTitle>
          <ToolTip text={tooltips[titulo]} placement="right" fontSize="14px" />
        </Box>
      </Box>
      <Grid container>
        <Grid
          item
          xs={2}
          sx={{
            backgroundColor: '#9ACDBF',
            borderTopLeftRadius: '15px',
            textAlign: 'center',
            border: '3px solid #264653',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          <Typography variant={'h5'}>
            {consejo?.valorConsejoGeneral} / 60
          </Typography>
        </Grid>
        <Grid
          item
          xs={10}
          sx={{
            backgroundColor: '#9ACDBF',
            borderTopRightRadius: '15px',
            border: '3px solid #264653',
            borderLeft: '0px solid',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant={'h6'}>{consejo?.consejoGeneral}</Typography>
        </Grid>
      </Grid>
      {consejo?.consejos?.map((oneConsejo, index) => (
        <Grid
          container
          direction="row"
          alignItems="center"
          sx={{
            backgroundColor: index % 2 === 0 ? '#A0DBC0' : '#94BFBE',
            width: '100%',
            marginLeft: '0px',
            padding: '20px',
            borderBottomLeftRadius:
              index === consejo?.consejos?.length - 1 ? '15px' : '0px',
            borderBottomRightRadius:
              index === consejo?.consejos?.length - 1 ? '15px' : '0px',
            borderRight: '3px solid #264653',
            borderLeft: '3px solid #264653',
            borderBottom: '3px solid #264653',
          }}
        >
          <Grid item xs={10}>
            <Typography>{oneConsejo}</Typography>
          </Grid>
        </Grid>
      ))}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          pt: 2,
          width: '100%',
          justifyContent: 'flex-end',
        }}
      >
        <ButtonsContainer width={activeStep === 0 ? '25%' : null}>
          {activeStep !== 0 && (
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
              type="button"
            >
              Atrás
            </Button>
          )}
          <Button
            color="primary"
            onClick={activeStep === steps?.length - 1 ? goToHub : handleNext}
          >
            {activeStep === steps?.length - 1 ? 'Finalizar' : 'Siguiente'}
          </Button>
        </ButtonsContainer>
      </Box>
    </CreateContent>
  );
};

export default PorterViewResults;
