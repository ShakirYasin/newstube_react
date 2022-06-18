import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { MdLibraryBooks, MdSubscriptions, MdManageAccounts } from 'react-icons/md';
import { GiPapers, GiAnticlockwiseRotation } from 'react-icons/gi';


export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'News',
    path: '/news',
    icon: <GiPapers />,
    cName: 'nav-text'
  },
  {
    title: 'Library',
    path: '/library',
    icon: <MdLibraryBooks />,
    cName: 'nav-text'
  },
  {
    title: 'Subscriptions',
    path: '/subscriptions',
    icon: <MdSubscriptions />,
    cName: 'nav-text'
  },
  {
    title: 'History',
    path: '/history',
    icon: <GiAnticlockwiseRotation />,
    cName: 'nav-text'
  },
  {
    title: 'Accounts',
    path: '/accounts',
    icon: <MdManageAccounts />,
    cName: 'nav-text'
  }
];

export const creatorSidebar = [
  {
    title: 'Home',
    path: '/',
    icon: <AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'News',
    path: '/news',
    icon: <GiPapers />,
    cName: 'nav-text'
  },
  {
    title: 'Library',
    path: '/library',
    icon: <MdLibraryBooks />,
    cName: 'nav-text'
  },
  {
    title: 'Channel',
    path: '/channel',
    icon: <MdLibraryBooks />,
    cName: 'nav-text'
  },
  {
    title: 'Subscriptions',
    path: '/subscriptions',
    icon: <MdSubscriptions />,
    cName: 'nav-text'
  },
  {
    title: 'History',
    path: '/history',
    icon: <GiAnticlockwiseRotation />,
    cName: 'nav-text'
  },
  {
    title: 'Accounts',
    path: '/accounts',
    icon: <MdManageAccounts />,
    cName: 'nav-text'
  }
];