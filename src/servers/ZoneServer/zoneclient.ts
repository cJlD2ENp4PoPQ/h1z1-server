import SOEClient from "../SoeServer/soeclient";
import { RemoteInfo } from "dgram";
import Character from "./character";

export default class ZoneClient extends SOEClient {
  
    currentPOI?: number;
    firstLoading: boolean = false;
    isLoading: boolean = false;
    isInteracting: boolean = false;
    posAtLastRoutine: Float32Array = new Float32Array();
    posAtLogoutStart: Float32Array = new Float32Array();
    timer: any;
    spawnedEntities: any[] = [];
    managedObjects: any[] = [];
    vehicle: {
      falling: number;
      mountedVehicle?: string;
      mountedVehicleType?: string;
      vehicleState: number;
    };
    character: Character;
    loginSessionId?: string;
    lastPingTime: number = 0;
    pingTimer: any;
    savePositionTimer: any;
  constructor(
    initialClient: SOEClient,loginSessionId:string,characterId:string,generatedTransient:number
  ) {
    super(
        {address:initialClient.address,port:initialClient.port} as RemoteInfo,
        initialClient.crcSeed,
        initialClient.compression,
        initialClient.cryptoKey
        );
    this.inputStream = initialClient.inputStream;
    this.outputStream = initialClient.outputStream;
    this.crcSeed = initialClient.crcSeed;
    this.sequences = initialClient.sequences;
    this.outQueue = initialClient.outQueue;
    this.protocolName = initialClient.protocolName;
    this.outOfOrderPackets = initialClient.outOfOrderPackets;
    this.nextAck = initialClient.nextAck;
    this.lastAck = initialClient.lastAck;
    this.outQueueTimer = initialClient.outputStream;
    this.ackTimer = initialClient.inputStream;
    this.outOfOrderTimer = initialClient.outputStream;

    this.isLoading = true;
    this.firstLoading = true;
    this.loginSessionId = loginSessionId;
    this.vehicle = {
      vehicleState: 0,
      falling: -1,
    };
    this.lastPingTime = new Date().getTime() + 120 * 1000;
    this.character = new Character(characterId,generatedTransient);
    this.spawnedEntities = [];
    this.managedObjects = [];
  }
}