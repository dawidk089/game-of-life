/**
* Klasa przechowuje plansze do gry w życie.
*/
public final class LifeBoard
{

	public LifeBoard(int sizeX, int sizeY)
	{
		 board = new boolean[sizeY][sizeX];
	}
	
	public boolean getStatus(int x, int y)
	{
		return board[y][x];
	}
	
	public void setStatus(int x, int y, boolean status)
	{
		board[y][x] = status;
	}
	
	public int getYSize()
	{
		return board.length;
	}
	
	public int getXSize()
	{
		return board[0].length;
	}
	
	public LifeBoard clone()
	{
		LifeBoard newBoard = new LifeBoard(getXSize(), getYSize());
		for (int y = 0; y < getYSize(); ++y)
 		{
 			for (int x = 0; x < getXSize(); ++x)
 				newBoard.setStatus(x, y, getStatus(x, y));
 		}
 		return newBoard;
	}
	
	public int aliveNeighbours(int x, int y)
	{
		int alive = 0;
		if (x > 0 && board[y][x - 1] == true)
			++alive;
		if (x < board[0].length - 1 && board[y][x + 1] == true)
			++alive;
		if (y > 0 && board[y - 1][x] == true)
			++alive;
		if (y < board.length - 1 && board[y + 1][x] == true)
			++alive;
		if (x > 0 && y > 0 && board[y - 1][x - 1] == true)
			++alive;
		if (x > 0 && y < board.length - 1 && board[y + 1][x - 1] == true)
			++alive;
		if (x < board[0].length - 1 && y > 0 && board[y - 1][x + 1] == true)
			++alive;
		if (x < board[0].length - 1 && y < board.length - 1 && board[y + 1][x + 1] == true)
			++alive;
		return alive;
	}
	
	private boolean board[][];

}
