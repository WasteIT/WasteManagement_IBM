function list_child_processes () {
    local ppid=$1;
    local current_children=$(pgrep -P $ppid);
    local local_child;
    if [ $? -eq 0 ];
    then
        for current_child in $current_children
        do
          local_child=$current_child;
          list_child_processes $local_child;
          echo $local_child;
        done;
    else
      return 0;
    fi;
}

ps 76418;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 76418 > /dev/null;
done;

for child in $(list_child_processes 76423);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/juliusdalsgaardbertelsen/Documents/ITU/WasteIT/WasteManagement_IBM/src/bin/Debug/net7.0/b26e96961b8f4e6aaa7736ea0dd8c949.sh;
