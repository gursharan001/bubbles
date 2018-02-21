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
        const scene = new BABYLON.Scene(this._engine);
        scene.enablePhysics(BABYLON.Vector3.Zero(), new BABYLON.CannonJSPlugin());
        const camera = this.addCamera(scene, this._canvas);
        const light = this.addLight(scene);
        this.addTasks(scene);
        this.addPlayground(scene);
        
        this._scene = scene;
        this._camera = camera;
        this._light = light;
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