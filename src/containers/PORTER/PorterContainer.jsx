import React, { useEffect, useState } from 'react';
import LayoutContainer from 'containers/LayoutContainer';
import { Container } from 'views/PorterView/styles';
import PorterView from 'views/PorterView';
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  onGetOne,
  onGetOptions,
  onGetQuestions,
  onInsertQuestions,
} from 'redux/actions/porter.actions';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from 'components/commons/Button';
import Typography from '@mui/material/Typography';
import { initialValuesSelector } from 'redux/selectors/porter.selector';
import { Menu, MenuItem } from '@mui/material';
import Comments from 'components/comments/Comments';
import { COLORS } from 'helpers/enums/colors';
import Loading from 'components/commons/Loading';
import { onGetAll as onGetAllComments } from 'redux/actions/comments.actions';
import { getLabel } from 'helpers/enums/porter';
import { onGetOne as onGetProject } from 'redux/actions/projects.actions';
import permission from 'helpers/permissions';
import { StageByTool, Tools } from 'helpers/enums/steps';

const PorterContainer = () => {
  const { porterId, id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClickResultsButton = () =>
    navigate(`/projects/${id}/porter/${porterId}/results`);
  
  const onClickGoBackButton = () => {
    const stage = StageByTool[Tools.Porter];
    navigate(`/projects/${id}/stage/${stage}`)
  };

  const { options, questions, loading } = useSelector((state) => state.porter);

  delete options.fuerza;

  const steps = Object.keys(questions);

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [anchorElement, setAnchorElement] = useState(null);

  const initialValues = useSelector(initialValuesSelector);

  const root = useSelector((state) => state);
  const userPermission = permission(root, 'externalEnvironment');

  const isStepOptional = (step) => {
    return step === 99;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const isLastStep = () => {
    return activeStep === steps?.length - 1;
  };

  const handleSubmit = (formData) => {
    if (isLastStep()) {
      dispatch(onInsertQuestions(porterId, formData, onClickResultsButton));
    } else {
      let newSkipped = skipped;

      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect(() => {
    dispatch(onGetProject(id));
    dispatch(onGetOne(porterId));
    dispatch(onGetQuestions());
    dispatch(onGetOptions());
    dispatch(onGetAllComments('PORTER', porterId));
  }, []);

  return (
    <LayoutContainer>
      <Container>
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={activeStep}>
            {steps?.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption">Optional</Typography>
                );
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{getLabel(label)}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps?.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                {!loading && (
                  <PorterView
                    options={options}
                    questions={questions[steps[activeStep]]}
                    initialValues={initialValues}
                    activeStep={activeStep}
                    handleBack={handleBack}
                    handleSubmit={handleSubmit}
                    steps={steps}
                    titulo={getLabel(steps[activeStep])}
                    onClickResults={onClickResultsButton}
                    onClickButtonGoBack={onClickGoBackButton}
                    openComments={(target) => setAnchorElement(target)}
                    userPermission={userPermission}
                  />
                )}
                <Menu
                  anchorEl={anchorElement}
                  onClose={() => setAnchorElement(null)}
                  open={!!anchorElement}
                  PaperProps={{
                    style: {
                      width: 500,
                    },
                  }}
                  sx={{
                    '& .MuiMenu-list': {
                      background: COLORS.AthensGray,
                    },
                  }}
                >
                  <MenuItem key={1} disableRipple>
                    <Comments
                      show
                      tool="PORTER"
                      toolId={porterId}
                      projectId={id}
                    />
                  </MenuItem>
                </Menu>
              </Typography>
            </React.Fragment>
          )}
        </Box>
      </Container>
      {(loading) && <Loading isModalMode message="Cargando Porter" />}
    </LayoutContainer>
  );
};

export default PorterContainer;
