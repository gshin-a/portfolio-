import React, { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import {
  DialogActions,
  DialogContent,
  Button,
  Dialog,
  DialogTitle,
  TextField,
} from '@mui/material';
import DefaultBookCard from './components/DefaultBookCard/DefaultBookCard';
import PokemonBookCard from './components/PokemonBookCard/PokemonBookCard';
import ScrollUpButton from '../../components/commons/ScrollUpButton';
import ImgSrc from '../../core/constants/ImgSrc';
import RankingButton from '../../components/commons/RankingButton';

import * as Api from '../../api';

function IllustratedBookPage() {
  const [selectType, setSelectType] = useState(10);
  const [searchName, setSearchName] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [userPokemonList, setUserPokemonList] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);
  const [userPokemonObj, setUserPokemonObj] = useState({});
  const [pokemonNumber, setPokemonNumber] = useState();

  useEffect(() => {
    Api.get('user/current').then((res) => {
      setUserPokemonList(res.data.stickers);
    });
  }, []);

  useEffect(() => {
    const newUserPokemonObj = {};
    userPokemonList.forEach((value) => {
      newUserPokemonObj[value.id] = value.name;
    });

    setUserPokemonObj(newUserPokemonObj);

    const userPokemonIdList = userPokemonList.map((pokemon) => pokemon.id);

    const userPokemonIdSetList = [...new Set(userPokemonIdList)];

    setPokemonNumber(Object.keys(userPokemonIdSetList).length);
  }, [userPokemonList]);

  useEffect(() => {
    const newPokemonList = [];
    for (let i = 1; i < 152; i += 1) {
      newPokemonList.push(i.toString());
    }
    setPokemonList(newPokemonList);
  }, []);

  const handleChangeType1 = (e) => {
    setSelectType(e.target.value);
  };

  const handleClickOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const onChangeSearchName = (e) => {
    setSearchName(e.target.value);
  };

  return (
    <div style={{ marginTop: '25vh', marginBottom: '20vh' }}>
      <FormControl
        style={{ width: '200px', marginLeft: '40px', backgroundColor: 'white' }}
      >
        <InputLabel id='demo-simple-select-label'>??????</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={selectType}
          label='??????'
          onChange={handleChangeType1}
        >
          <MenuItem value={10}>??????</MenuItem>
          <MenuItem value={20}>??????</MenuItem>
          <MenuItem value={30}>??????</MenuItem>
          <MenuItem value={40}>???</MenuItem>
          <MenuItem value={50}>???</MenuItem>
          <MenuItem value={60}>??????</MenuItem>
          <MenuItem value={70}>??????</MenuItem>
          <MenuItem value={80}>??????</MenuItem>
          <MenuItem value={90}>???</MenuItem>
          <MenuItem value={100}>???</MenuItem>
          <MenuItem value={110}>??????</MenuItem>
          <MenuItem value={120}>?????????</MenuItem>
          <MenuItem value={130}>??????</MenuItem>
          <MenuItem value={140}>??????</MenuItem>
          <MenuItem value={150}>?????????</MenuItem>
          <MenuItem value={160}>?????????</MenuItem>
          <MenuItem value={170}>??????</MenuItem>
          <MenuItem value={180}>?????????</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant='contained'
        color='inherit'
        onClick={handleClickOpen}
        style={{ marginLeft: '30px', marginTop: '10px' }}
      >
        ?????? ?????????
      </Button>
      <Dialog open={isOpen} onClose={handleClose} style={{ zIndex: '10000' }}>
        <DialogTitle>????????? ?????? ?????????</DialogTitle>
        <DialogContent>
          <img alt='' src={ImgSrc.typeColorImg} />
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='inherit' onClick={handleClose}>
            ??????
          </Button>
        </DialogActions>
      </Dialog>
      <TextField
        id='outlined-basic'
        label='????????? ?????? ??????'
        variant='outlined'
        onChange={onChangeSearchName}
        style={{
          backgroundColor: 'white',
          float: 'right',
          marginRight: '50px',
        }}
      />
      <div style={{ textAlign: 'end', marginTop: '20px', marginRight: '50px' }}>
        ????????? ????????? ???: {pokemonNumber}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateRows: '1fr ',
          gridTemplateColumns: '1fr '.repeat(5),
          gap: '2em 1em',
          marginTop: '50px',
        }}
      >
        {pokemonList.map((num) =>
          Object.keys(userPokemonObj).includes(num) ? (
            <PokemonBookCard
              key={Number(num)}
              name={userPokemonObj[num]}
              selectType={String(selectType)}
              searchName={searchName}
              num={Number(num)}
            />
          ) : (
            <DefaultBookCard
              key={Number(num)}
              selectType={String(selectType)}
              searchName={searchName}
            />
          )
        )}
      </div>
      <ScrollUpButton />
      <RankingButton />
    </div>
  );
}

export default IllustratedBookPage;
