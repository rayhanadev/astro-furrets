{ pkgs }: {
	deps = [
		pkgs.nodejs-16_x
		pkgs.yarn
		pkgs.replitPackages.jest
	];
}