import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth"
import axios from 'axios';
import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import SidebarMenu from '../../components/SidebarMenu';
import SidebarMenuCollapsed from '../../components/SidebarMenuCollapsed';
import PiuContainer from '../../components/PiuContainer';

import { User, Piu, PiuLike } from '../../services/entities';

import * as S from './styles';

import piarIcon from '../../assets/images/icons/feather-solid-white.svg';
import userEvent from '@testing-library/user-event';

function Feed() {
    const { user, token } = useAuth();
    
    const [piuArray, setPiuArray] = useState<Array<Piu>>([] as Array<Piu>);
    const [piuToPostLength, setPiuToPostLenght] = useState(0);

    const loadPius = async () => {
        try {
            const response = await api.get('/pius/', {
                    headers: { Authorization: `Bearer ${token}` }
                }
            )
            setPiuArray(response.data);
        } catch {
            alert("Tente carregar pius novamente mais tarde!")
        }
    }

    useEffect(() => {
        loadPius();
        console.log(piuArray);
    }, [])

    const handlePiar = (e: FormEvent) => {
        e.preventDefault();
        console.log("oi")
    }

    return (
        <>
            <PageHeader/>
            <S.ContentWrapper>
                <SidebarMenu/>
                <SidebarMenuCollapsed/>
                <S.FeedContent>
                    <S.PiarInputArea>
                        <img src={user.photo} alt="Avatar"/>
                        <S.PiarInput>
                            <form onSubmit={handlePiar}>
                                <textarea 
                                    onChange={(e) => {setPiuToPostLenght(e.target.textLength)}}
                                    placeholder="Dê um piu!">
                                </textarea>
                                
                                <S.PiarInputWarning>Empty piu</S.PiarInputWarning>
                                <S.PiarInputFooter>
                                    <span 
                                        className={piuToPostLength > 140 ? "warning" : ""}
                                    >{piuToPostLength}/140</span>
                                    <button type="submit"><img src={piarIcon} alt="Profile"/>Piar</button>
                                
                                </S.PiarInputFooter>
                            </form>
                        </S.PiarInput>
                    </S.PiarInputArea>
                    <S.PiusSection>
                        {piuArray.map(piu => {
                            return (
                                <PiuContainer  key={piu.id} content={piu}/>
                            )
                        })}
                    </S.PiusSection>
                    <S.UnsuccessfulSearchTag>
                        Não foi encontrado nenhum piu ou usuário :(
                    </S.UnsuccessfulSearchTag>
                </S.FeedContent>
            </S.ContentWrapper>
        </>
    );
}

export default Feed;