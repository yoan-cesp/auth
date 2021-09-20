import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import React, { useState } from "react";
import { ListMenuItem, MainListItems } from "../SideNav/SideNav";
import { connect, useDispatch } from "react-redux";
import { PowerSettingsNew } from "@material-ui/icons";
import { bindActionCreators } from "redux";
import {
  getCode,
  processLogin,
  processLogout,
} from "../../../../redux/actions/authAction";

const drawerWidth = 240;

const menuItems: ListMenuItem[] = [
  {
    key: "dashboard",
    icon: "Dashboard",
    label: "Inicio",
  },
  {
    key: "settings",
    icon: "Settings",
    label: "Configuración",
  },
  {
    key: "maestros",
    icon: "LocalShipping",
    label: "Maestros",
    children: [
      { key: "transportistas", label: "Transportistas" },
      { key: "conductores", label: "Conductores" },
      { key: "camiones", label: "Camiones" },
    ],
  },
  {
    key: "guias_retornos",
    icon: "Assignment",
    label: "Guias y retornos",
    children: [
      { key: "gd", label: "Generar guías" },
      { key: "cgdr", label: "Consultar guías" },
      { key: "gp", label: "Guías pendientes" },
      { key: "gr", label: "Gestionar retornos" },
      { key: "rp", label: "Retornos pendientes" },
    ],
  },
  {
    key: "informes",
    icon: "Assessment",
    label: "Informes",
    children: [
      { key: "rgg", label: "Guías generadas" },
      { key: "af", label: "Archivo de facturación" },
    ],
  },
];

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    backgroundColor: theme.palette.primary.light,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

const DrawerApp = (props: any) => {
  const [open, setOpen] = useState(true);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const logout = () => {
    processLogout(dispatch);
  };

  return (
    <>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
          <IconButton color="inherit" onClick={logout}>
            <PowerSettingsNew />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            align={"center"}
            noWrap
            className={classes.title}
          >
            {`${props.user?.firstName} ${props.user?.lastName}`}
          </Typography>

          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <MainListItems items={menuItems} />
        </List>
      </Drawer>
    </>
  );
};

function mapStateToProps(state: any) {
  return {
    user: state.Auth.userData,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    processLogin: bindActionCreators(processLogin, dispatch),
    getCode: bindActionCreators(getCode, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerApp);
