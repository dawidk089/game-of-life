public final class lab04
{

	public static void main(String[] args)
	{
		LifeGame game = new LifeGame(Integer.parseInt(args[0]), Integer.parseInt(args[1]), Integer.parseInt(args[3]));
		game.generateStepps(Integer.parseInt(args[2]));
	}

}
