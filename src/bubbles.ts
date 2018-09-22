class Bubbles {
    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _camera: BABYLON.ArcRotateCamera;
    private _light: BABYLON.Light;

    constructor(canvasElement : string) {
        // Create canvas and engine
        this._canvas = <HTMLCanvasElement>document.getElementById(canvasElement);
        this._engine = new BABYLON.Engine(this._canvas, true);
    }
  
    createScene() : void {
      const canvas = this._canvas;
      const engine = this._engine;
      let scene = new BABYLON.Scene(engine);
      scene.clearColor = BABYLON.Color4.FromColor3(BABYLON.Color3.Purple());
      scene.collisionsEnabled = true;
  
      //var camera = new BABYLON.FreeCamera("Camera", new BABYLON.Vector3(0, 0, -20), scene);
      var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 0, -20), scene);
      camera.attachControl(canvas, true);
      camera.checkCollisions = true;
      camera.applyGravity = true;
      camera.setTarget(new BABYLON.Vector3(0, 0, 0));
      //Set the ellipsoid around the camera (e.g. your player's size)
      camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);

      var light = new BABYLON.DirectionalLight("dir02", new BABYLON.Vector3(0.2, -1, 0), scene);
      light.position = new BABYLON.Vector3(0, 80, 0);
  
      // Material
      var materialAmiga = new BABYLON.StandardMaterial("amiga", scene);
      const diffuseTexture = new BABYLON.Texture("textures/amiga.jpg", scene);
      materialAmiga.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
      diffuseTexture.uScale = 5;
      diffuseTexture.vScale = 5;
      materialAmiga.diffuseTexture = diffuseTexture;
  
      var materialAmiga2 = new BABYLON.StandardMaterial("amiga", scene);
      materialAmiga2.diffuseTexture = new BABYLON.Texture("textures/amiga.jpg", scene);
      materialAmiga2.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
  
      // Shadows
      var shadowGenerator = new BABYLON.ShadowGenerator(2048, light);
  
      // Physics
      //scene.enablePhysics(null, new BABYLON.CannonJSPlugin());
      scene.enablePhysics(null, new BABYLON.OimoJSPlugin());
  
      // Spheres
      var y = 0;
      // for (var index = 0; index < 100; index++) {
      //     var sphere = BABYLON.Mesh.CreateSphere("Sphere0", 16, 3, scene);
      //     sphere.material = materialAmiga;
  
      //     sphere.position = new BABYLON.Vector3(Math.random() * 20 - 10, y, Math.random() * 10 - 5);
  
      //     shadowGenerator.addShadowCaster(sphere);
  
      //     sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1 }, scene);
   
      //     y += 2;
      // }
  
      // Link
      const spheres = [];
      for (let index = 0; index < 10; index++) {
          let sphere = BABYLON.Mesh.CreateSphere(`Sphere${index}`, 16, 1, scene);
          spheres.push(sphere);
          sphere.material = materialAmiga2;
          sphere.position = new BABYLON.Vector3(Math.random() * 20 - 10, y, Math.random() * 10 - 5);
          sphere.checkCollisions = true;

          shadowGenerator.addShadowCaster(sphere);
  
          sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1 }, scene);
      }
  
      // for (let index = 0; index < 9; index++) {
      //     spheres[index].setPhysicsLinkWith(spheres[index + 1], new BABYLON.Vector3(0, 0.5, 0), new BABYLON.Vector3(0, -0.5, 0));
      // }
  
      // Box
      // var box0 = BABYLON.Mesh.CreateBox("Box0", 3, scene);
      // box0.position = new BABYLON.Vector3(3, 30, 0);
      // var materialWood = new BABYLON.StandardMaterial("wood", scene);
      // materialWood.diffuseTexture = new BABYLON.Texture("textures/crate.png", scene);
      // materialWood.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
      // box0.material = materialWood;
  
      // shadowGenerator.addShadowCaster(box0);
  
      // // Compound
      // var part0 = BABYLON.Mesh.CreateBox("part0", 3, scene);
      // part0.position = new BABYLON.Vector3(3, 30, 0);
      // part0.material = materialWood;
  
      // var part1 = BABYLON.Mesh.CreateBox("part1", 3, scene);
      // part1.parent = part0; // We need a hierarchy for compound objects
      // part1.position = new BABYLON.Vector3(0, 3, 0);
      // part1.material = materialWood;
  
      // shadowGenerator.addShadowCaster(part0);
      // shadowGenerator.addShadowCaster(part1);
      // shadowGenerator.useBlurExponentialShadowMap = true;
      // shadowGenerator.useKernelBlur = true;
      // shadowGenerator.blurKernel = 32;
  
  
      // Playground
      var ground = BABYLON.Mesh.CreateBox("Ground", 1, scene);
      ground.scaling = new BABYLON.Vector3(100, 1, 100);
      ground.position.y = -5.0;
      ground.checkCollisions = true;
  
      var border0 = BABYLON.Mesh.CreateBox("border0", 1, scene);
      border0.scaling = new BABYLON.Vector3(1, 100, 100);
      border0.position.y = -5.0;
      border0.position.x = -50.0;
      border0.checkCollisions = true;
  
      var border1 = BABYLON.Mesh.CreateBox("border1", 1, scene);
      border1.scaling = new BABYLON.Vector3(1, 100, 100);
      border1.position.y = -5.0;
      border1.position.x = 50.0;
      border1.checkCollisions = true;
  
      var border2 = BABYLON.Mesh.CreateBox("border2", 1, scene);
      border2.scaling = new BABYLON.Vector3(100, 100, 1);
      border2.position.y = -5.0;
      border2.position.z = 50.0;
      border2.checkCollisions = true;
  
      var border3 = BABYLON.Mesh.CreateBox("border3", 1, scene);
      border3.scaling = new BABYLON.Vector3(100, 100, 1);
      border3.position.y = -5.0;
      border3.position.z = -50.0;
      border3.checkCollisions = true;
  
      var groundMat = new BABYLON.StandardMaterial("groundMat", scene);
      groundMat.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5);
      groundMat.emissiveColor = new BABYLON.Color3(0.2, 0.2, 0.2);
      groundMat.backFaceCulling = false;
      ground.material = groundMat;
      border0.material = groundMat;
      border1.material = groundMat;
      border2.material = groundMat;
      border3.material = groundMat;
      ground.receiveShadows = true;
  
      // Physics
      // box0.physicsImpostor = new BABYLON.PhysicsImpostor(box0, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 2, friction: 0.4, restitution: 0.3 }, scene);
      ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, scene);
      border0.physicsImpostor = new BABYLON.PhysicsImpostor(border0, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
      border1.physicsImpostor = new BABYLON.PhysicsImpostor(border1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
      border2.physicsImpostor = new BABYLON.PhysicsImpostor(border2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
      border3.physicsImpostor = new BABYLON.PhysicsImpostor(border3, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
  
      // part0.physicsImpostor = new BABYLON.PhysicsImpostor(part0, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 2, friction: 0.4, restitution: 0.3 }, scene); 
  
      this._scene = scene;

      window.addEventListener("click", this.pickMesh);
    }

    pickMesh = () => {
      const pickResult = this._scene.pick(this._scene.pointerX, this._scene.pointerY);
      if(pickResult.pickedMesh){
        console.log([pickResult.pickedMesh.id, pickResult]);
      }else{
        console.log(pickResult);
      }
    }

    addCamera(scene: BABYLON.Scene, canvas: HTMLCanvasElement) {
        const camera = new BABYLON.ArcRotateCamera('camera1', Math.PI / 8, Math.PI / 2.5, 50, BABYLON.Vector3.Zero(), scene);
        // target the camera to scene origin
        //camera.setTarget(BABYLON.Vector3.Zero());
        // attach the camera to the canvas
        camera.attachControl(canvas, false);
        //camera.checkCollisions = true;
        //camera.applyGravity = true;
        return camera;
    }

    addLight(scene: BABYLON.Scene) {
        const light = new BABYLON.DirectionalLight("dir02", new BABYLON.Vector3(0.2, -1, 0), scene);
        light.position = new BABYLON.Vector3(0, 80, 0);
        return light;
    }

    addPlayground(scene: BABYLON.Scene) {
        const ground = BABYLON.Mesh.CreateBox("Ground", 1, scene);
        ground.scaling = new BABYLON.Vector3(100, 1, 100);
        ground.position.y = -5.0;
        ground.checkCollisions = true;

        const border0 = BABYLON.Mesh.CreateBox("border0", 1, scene);
        border0.scaling = new BABYLON.Vector3(1, 100, 100);
        border0.position.y = -5.0;
        border0.position.x = -50.0;
        border0.checkCollisions = true;

        const border1 = BABYLON.Mesh.CreateBox("border1", 1, scene);
        border1.scaling = new BABYLON.Vector3(1, 100, 100);
        border1.position.y = -5.0;
        border1.position.x = 50.0;
        border1.checkCollisions = true;

        const border2 = BABYLON.Mesh.CreateBox("border2", 1, scene);
        border2.scaling = new BABYLON.Vector3(100, 100, 1);
        border2.position.y = -5.0;
        border2.position.z = 50.0;
        border2.checkCollisions = true;

        const border3 = BABYLON.Mesh.CreateBox("border3", 1, scene);
        border3.scaling = new BABYLON.Vector3(100, 100, 1);
        border3.position.y = -5.0;
        border3.position.z = -50.0;
        border3.checkCollisions = true;

        const roof = BABYLON.Mesh.CreateBox("Roof", 1, scene);
        roof.scaling = new BABYLON.Vector3(100, -1, 100);
        roof.position.y = 45.0;
        roof.checkCollisions = true;

        const groundMat = new BABYLON.StandardMaterial("groundMat", scene);
        groundMat.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5);
        groundMat.emissiveColor = new BABYLON.Color3(0.2, 0.2, 0.2);
        groundMat.backFaceCulling = false;

        roof.material = groundMat;
        ground.material = groundMat;
        border0.material = groundMat;
        border1.material = groundMat;
        border2.material = groundMat;
        border3.material = groundMat;
        

        roof.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1 }, scene);
        ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1 }, scene);
        border0.physicsImpostor = new BABYLON.PhysicsImpostor(border0, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1 }, scene);
        border1.physicsImpostor = new BABYLON.PhysicsImpostor(border1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1 }, scene);
        border2.physicsImpostor = new BABYLON.PhysicsImpostor(border2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1 }, scene);
        border3.physicsImpostor = new BABYLON.PhysicsImpostor(border3, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1 }, scene);
    }

    addTasks(scene: BABYLON.Scene) {

        // Spheres
        let y = 0;
        for (var index = 0; index < 30; index++) {
            var sphere = BABYLON.Mesh.CreateSphere(`Sphere${index}`, 32, 3, scene);
            //sphere.material = materialAmiga;

            sphere.position = new BABYLON.Vector3(Math.random() * 20 - 10, y, Math.random() * 10 - 5);
            
            const letters = `Task ${index+1}`;
	
            const dynTex = new BABYLON.DynamicTexture("dynamic texture", 512, scene, true);
                dynTex.drawText(letters, null, 250, "25px verdana", "black", "white");
                dynTex.wAng = Math.PI;
                dynTex.vOffset = -0.05;
                dynTex.uOffset = -0.25;
            
            const material = new BABYLON.StandardMaterial("sMat", scene);
            material.diffuseTexture = dynTex;
            sphere.material = material;

            const physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 1 }, scene);
            const negative = Math.random() > 0.5 ? 1 : -1;
            //physicsImpostor.applyImpulse(new BABYLON.Vector3(negative * 20, 0, negative * 10), sphere.getAbsolutePosition());
            physicsImpostor.setAngularVelocity(new BABYLON.Quaternion(0, 1, 0, 0) as any);
            sphere.physicsImpostor = physicsImpostor;
            y += 1;
        }
    }

    doRender() : void {
        // run the render loop
        this._engine.runRenderLoop(() => {
            this._scene.render();
        });

        // the canvas/window resize event handler
        window.addEventListener('resize', () => {
            this._engine.resize();
        });
    }
}
  
window.addEventListener('DOMContentLoaded', () => {
    // Create the game using the 'renderCanvas'
    let game = new Bubbles('renderCanvas');

    // Create the scene
    game.createScene();

    // start animation
    game.doRender();
});
