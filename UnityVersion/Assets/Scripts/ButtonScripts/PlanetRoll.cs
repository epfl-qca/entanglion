﻿using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Mirror;

public class PlanetRoll : NetworkBehaviour
{
    public bool wasClicked;
    public PlayerManager playerManager;

    private void Start()
    {
        wasClicked = false;
    }
    public void OnRoll()
    {

        if (!wasClicked)
        {
            //wasClicked = true;
            NetworkIdentity networkIdentity = NetworkClient.connection.identity;
            playerManager = networkIdentity.GetComponent<PlayerManager>();
            //if (playerManager.gameManager.isMyTurn)
            //{
            playerManager.CmdRollPlanet();
            //}
        }

    }
}