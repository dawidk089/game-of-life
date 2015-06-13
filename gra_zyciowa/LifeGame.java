/**
* Klasa reprezentująca grę w życie.
*/
public final class LifeGame
{

	/**
	* Konstruktor
	* @param sizeX
	*	szerokość gry
	* @param sizeY
	*	wysokość gry
	* @param preset
	*	początkowe ustawienie tzw. preset
	*/
	public LifeGame(int sizeX, int sizeY, int preset)
	{
		board = new LifeBoard(sizeX, sizeY);
		int xRelative = (board.getXSize() - 3) / 2;
		int yRelative = (board.getYSize() - 3) / 2;
		switch (preset)
		{
			case 0:
		 		for (int y = 0; y < board.getYSize(); ++y)
		 		{
		 			for (int x = 0; x < board.getXSize(); ++x)
		 				board.setStatus(x, y, Math.random() >= 0.5 ? true : false);
		 		}
		 		break;
		 	case 1:
		 		board.setStatus(xRelative + 0, yRelative + 0, true);
		 		board.setStatus(xRelative + 1, yRelative + 0, true);
		 		board.setStatus(xRelative + 0, yRelative + 1, true);
		 		board.setStatus(xRelative + 2, yRelative + 1, true);
		 		board.setStatus(xRelative + 1, yRelative + 2, true);
		 		break;
		 	case 2:
		 		board.setStatus(xRelative + 1, yRelative + 0, true);
		 		board.setStatus(xRelative + 1, yRelative + 1, true);
		 		board.setStatus(xRelative + 1, yRelative + 2, true);
		 		break;
		 	case 3:
				board.setStatus(xRelative + 0, yRelative + 0, true);
		 		board.setStatus(xRelative + 1, yRelative + 0, true);
		 		board.setStatus(xRelative + 2, yRelative + 0, true);
		 		board.setStatus(xRelative + 0, yRelative + 1, true);
		 		board.setStatus(xRelative + 1, yRelative + 2, true);
		 		break;
		 }
	}
	
	/**
	* Generuje kolejne kroki gry w życie i wypisuje te kroki na ekran
	* @param stepps
	*	ilość kroków
	*/
	public void generateStepps(int stepps)
	{
		for (int step = 1; step <= stepps; ++step)
		{
			generateNextStep();
			for (int i = 0; i < (board.getXSize() - 2 - Integer.toString(currentStep).length()) / 2; ++i)
				System.out.print("-");
			System.out.print(" " + currentStep + " ");
			for (int i = 0; i < (board.getXSize() - 2 - Integer.toString(currentStep).length()) / 2; ++i)
				System.out.print("-");
			if ((board.getXSize() - 2 - Integer.toString(currentStep).length()) % 2 == 1)
				System.out.print("-");
			System.out.print("\n");
			for (int y = 0; y < board.getYSize(); ++y)
	 		{
	 			for (int x = 0; x < board.getXSize(); ++x)
	 			{
	 				if (board.getStatus(x, y) == true)
	 					System.out.print("X");
	 				else
	 					System.out.print(".");
	 			}
	 			System.out.print("\n");
	 		}
		}
	}
	
	private void generateNextStep()
	{
		++currentStep;
		LifeBoard temp = board.clone();
		for (int y = 0; y < board.getYSize(); ++y)
 		{
 			for (int x = 0; x < board.getXSize(); ++x)
 			{
 				if (board.getStatus(x, y) == false && board.aliveNeighbours(x, y) == 3)
 					temp.setStatus(x, y, true);
 				else if (board.getStatus(x, y) == true && (board.aliveNeighbours(x, y) == 3 || board.aliveNeighbours(x, y) == 2))
 					continue;
 				else
 					temp.setStatus(x, y, false);
 			}
 		}
 		board = temp;
	}
	
	private LifeBoard board;
	private int currentStep = 0;

}
